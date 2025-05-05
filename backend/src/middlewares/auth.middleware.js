const supabase = require("../config/supabase.config");

const verifyBarber = async (req, res, next) => {
    try {
      const accessToken = req.cookies?.access_token;
      const refreshToken = req.cookies?.refresh_token;
  
      // Try verifying the access token
      if (accessToken) {
        const { data, error } = await supabase.auth.getUser(accessToken);
  
        if (data?.user) {
          req.barber = data.user.id;
          return next();
        }
      }
  
      // If no valid access token, try refreshing with refresh token
      if (refreshToken) {
        const { data: refreshedSession, error: refreshError } = await supabase.auth.refreshSession({
          refresh_token: refreshToken,
        });
  
        if (refreshedSession?.session?.access_token) {
          // Set the new cookies
          res.cookie('access_token', refreshedSession.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'lax',
          });
  
          req.barber = refreshedSession.user.id;
          return next();
        }
      }
  
      return res.status(401).json({ message: 'Unauthorized: Token missing or invalid' });
    } catch (err) {
      console.error("Auth Middleware Error:", err.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

module.exports = verifyBarber;
