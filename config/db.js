const mongoose=require('mongoose')

const URI='mongodb+srv://anmol111pal:PPap1310@cluster0-url-shortener.g8gia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-URL-Shortener'

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