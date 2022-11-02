const mongoose = require('mongoose')
const connectDb = async ()=>{
    try {
     
       const connect = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })   
    console.log(`The Db is connected at ${connect.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDb