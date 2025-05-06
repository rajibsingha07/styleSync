const { googleSignupPayload, signupWithPassword, insertBarberData, barberLogout, barberLogin } = require("../../repositories/v1/auth.repository");

const signupUsingGoogle = async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({
        message: "Token is required",
        });
    }
    
    try {
        const payload = await googleSignupPayload(token);

        if (!payload) {
        return res.status(400).json({
            message: "Invalid Google token",
        });
        }

        const { sub, email, name } = payload;

        return res.status(201).json({
        message: "User created successfully",
        user: {
            id: sub,
            email,
            name,
        },
        });
    } catch (error) {
        return res.status(500).json({
        message: "Internal server error",
        error: error.message,
        });
    }
}

const barberRegistration = async (req, res) => {
    const { email, password, phone, name, shopname, location, documentVerificationNumber } = req.body;

    try {
        const data = await signupWithPassword(email, password, phone);

        if (!data) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }

        await insertBarberData(
            data.user.id,
            name,
            phone,
            shopname,
            location,
            documentVerificationNumber
        );

        res.cookie("access_token", data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 1000, // 7 days in milliseconds
            sameSite: "lax",
        });

        res.cookie("refresh_token", data.session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
            sameSite: "lax",
        });

        return res.status(201).json({
            message: "Barber registration successful",
            barberId: data.user.id,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await barberLogin(email, password);

        if (!data) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        res.cookie("access_token", data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 1000, // 7 days in milliseconds
            sameSite: "lax",
        });

        res.cookie("refresh_token", data.session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
            sameSite: "lax",
        });

        return res.status(200).json({
            message: "Login successful",
            barberId: data.user.id,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const logout = async (req, res) => {
    try {
        const isLoggedOut = await barberLogout();

        if (!isLoggedOut) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = {
    signupUsingGoogle,
    barberRegistration,
    login,
    logout,
}