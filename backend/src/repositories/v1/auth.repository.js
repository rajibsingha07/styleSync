const { OAuth2Client } = require('google-auth-library');
const supabase = require('../../config/supabase.config');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignupPayload = async (token) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
  
      return payload;
}

const signupWithPassword = async (email, password, phone) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

const insertBarberData = async (barberId, name, phone, shopName, location, documentVerificationNumber) => {
    const { data, error } = await supabase
        .from('barbers')
        .insert([
            { barberId, name, phone, shopName, location, documentVerificationNumber }
        ])
        .select()

    if (error) {
        console.error("Insert error:", error);
        throw new Error(error.message);
    }

    return data;
}

const barberLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
    }

    return data;
}

const barberLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        return false;
    }

    return true;
}

const getBarberById = async (barberId) => {
    const { data, error } = await supabase
        .from('barbers')
        .select('*')
        .eq('barberId', barberId)
        .single();

    if (error) {
        console.error("Get barber error:", error);
        throw new Error(error.message);
    }

    return data;
}

module.exports = {
    googleSignupPayload,
    signupWithPassword,
    insertBarberData,
    barberLogout,
    barberLogin,
    getBarberById
}