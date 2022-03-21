const sendToken = (user, statusCode, res) => {
      const token = user.getJWTToken()
      res.status(statusCode).cookie("Token", token, { httpOnly: true }).json({
            success: true,
            user,
            token,
      });
};

module.exports = sendToken;