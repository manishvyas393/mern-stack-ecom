const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const session = require("express-session")
const Store = require("connect-mongodb-session")
const MyStore = Store(session)
const path = require('path');
const oneDay = 1000 * 60 * 60;
app.enable("trust-proxy")
app.use(cors({
      origin: "http://localhost:3000",
      credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
      useTempFiles: true
}))
app.use(session({
      secret: "qwertyuiopoiuytrewqwertyui",
      resave: false,
      saveUninitialized: false,
      store: new MyStore({
            uri: "mongodb+srv://manishvyas:manishvyas@cluster0.whkwf.mongodb.net/ecommerce?retryWrites=true&w=majority",
            collection: 'sessions',
      }),
      cookie: { maxAge: oneDay, },

}))
//route imports
const products = require("./routes/productRoute")
const users = require("./routes/userRoutes")
const orders = require("./routes/orderRoutes")
const payment = require("./routes/paymentRoutes")
app.use("/", products)
app.use("/", users)
app.use("/", orders)
app.use("/", payment)
//Middleware for error
app.use(express.static(path.join(__dirname, "./client/build/index.html")));

app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});
app.use(errorMiddleware)
module.exports = app