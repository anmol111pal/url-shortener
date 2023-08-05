const express=require('express')
const shortid = require('shortid') // for generating short-urls
const connectDB=require('./config/db') // for connection to the DB
const ShortUrl=require('./models/shortUrl') // for Schema

// connecting to database
connectDB()

const app=express()
const host=process.env.host || "localhost"
const port=process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static("public"));
app.set('views', 'views');

app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res)=>{
    res.render('index')
})

const checkIfAlreadyPresent=async (shortUrlGenerated)=>{
    const likeUrl2=await ShortUrl.findOne({short: shortUrlGenerated})
    if(likeUrl2==null) // not found in db
        return false
    else
        return true
}

const generateShortURL=()=>{
    return shortid.generate()
}

// handling a url-shortening request
app.post('/shortURL', async(req, res)=>{

    let shortUrlGenerated=generateShortURL()

    /*
        check if the 'full' and 'short' url already exist in the db,
        that is the relation should be ONE-ONE
        in other words, one 'full' url should map to one 'short' url
    */
    
    // if the generated url (shortUrlGenerated) matches in the db, then regenerate
    while(checkIfAlreadyPresent(shortUrlGenerated)===true){
        console.log("Short URL already exists, regenerate.")
        shortUrlGenerated=generateShortURL()
    }
    console.log("Short URL generated.")
    // create a new URL in the db
    await ShortUrl.create({
        full:  req.body.fullUrl,
        short: shortUrlGenerated
    })
    console.log("Doc inserted");

    // this url is an Object {
        // short:
        // full:
        // clicks:
    // }
    const url=await ShortUrl.findOne({full: req.body.fullUrl, short: shortUrlGenerated})
    res.render('showURL', {url: url})
})

// ?handling the 'get' request of 'short' URL
// and redirecting it to 'full' URL
app.get('/:shortUrl', async(req, res)=>{
    console.log("Short url got: ", req.params.shortUrl);
    console.log("type of shortURL: ", typeof req.params.shortUrl);
    const url=await ShortUrl.findOne({
        short: req.params.shortUrl
    })

    console.log("URL: ", url);
    // shortened version -> url.short
    // full version -> url.full
    res.redirect(url.full)
})

app.listen(port, ()=>{
    console.log(`Listening on http://${host}:${port}`)
})