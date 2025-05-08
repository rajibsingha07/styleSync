const supabase = require("../config/supabase.config");

const verifyBarber = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    // First try with access token
    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken);

      if (data?.user) {
        req.barber = data.user.id;
        return next();
      }
    }

    // If access token is invalid or expired, try refresh
    if (refreshToken) {
      const { data: refreshedSession, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (refreshError || !refreshedSession?.session?.access_token) {
        return res.status(401).json({ message: 'Unauthorized: Failed to refresh session' });
      }

      const newAccessToken = refreshedSession.session.access_token;
      const newRefreshToken = refreshedSession.session.refresh_token;

      // Set new cookies
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'none',
      });

      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
        sameSite: 'none',
      });

      // Get the user using the new access token
      const { data: refreshedUserData, error: userError } = await supabase.auth.getUser(newAccessToken);

      if (userError || !refreshedUserData?.user) {
        return res.status(401).json({ message: 'Unauthorized: Failed to fetch user after refresh' });
      }

      req.barber = refreshedUserData.user.id;
      return next();
    }

    return res.status(401).json({ message: 'Unauthorized: No valid token' });
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyBarber;
