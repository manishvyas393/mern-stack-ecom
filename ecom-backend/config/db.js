const mongoose = require("mongoose")
const connectDb = () => {
mongoose.connect(process.env.DB_URL).then((data) => console.log(`connected port:${data.connection.host}`))

}
module.exports=connectDb