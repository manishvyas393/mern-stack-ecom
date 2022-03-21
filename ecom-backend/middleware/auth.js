const errorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const User=require("../models/userModel")
exports.isAuthenticatedUser = async (req, res, next) => {
      const {Token} = req.cookies;
      if (!Token) {
            return next(new errorHandler("please login to acess this",401))
      }
      const decodeToken = jwt.verify(Token, process.env.JWT_SECRET)
      req.user = await User.findById(decodeToken.id)
      next()
}
exports.authorizedRoles = (...roles) => {
      return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                  return next(new errorHandler(
                        `Role:${req.user.role} is not allowed to access this resource`,403
                  ))
            }
            next()
      }
}