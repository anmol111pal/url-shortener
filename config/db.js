const mongoose=require('mongoose')

const URI='mongodb+srv://anmol:PPap1310@url-shortener.suefq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB=async ()=> {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Successfully connected to Database.")
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports=connectDB