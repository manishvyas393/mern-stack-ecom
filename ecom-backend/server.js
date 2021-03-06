const app = require("./app")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cloudinary = require("cloudinary").v2
dotenv.config()
connectDB()
cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret
});

const server = app.listen(process.env.PORT||3000, () => console.log("server running"))

//unhandle error rejection
process.on("unhandledRejection", err => {
      console.log(`Error:${err.message}`)
      console.log("shutting down server")
      server.close(() => {
            process.exit(1);
      })
})