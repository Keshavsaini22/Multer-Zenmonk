const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const multer = require('multer')


const ImagesModel = require('./models/Images')

const app = express()
const port = 8080
const url = "mongodb+srv://keshavsainikesu:Imhater@cluster0.iinxsrb.mongodb.net/?retryWrites=true&w=majority"
const upload = multer({ dest: './uploads' })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],  //eh jo likhya this is to get data from cookie
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use('/uploads', express.static('uploads')) //Important for using multer to fetch data by frontend to backend

try {
    mongoose.connect(url);
    console.log("connected to mongodb")
}
catch (error) {
    console.error(error);
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const uploadmiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images' }])

app.post('/uploads', uploadmiddleware, async (req, res) => {
    // const image = req.files.image.map((i) => { return (i.path) })[0];
    // const images = req.files.images.map((i) => { return i.path })
    // const data = await ImagesModel.create({ img: image, imgs: images })
    // console.log("data", data)
    // res.status(200).json(data)
    const img = req.files.image[0].path
    const imgs = req.files.images.map((i) => { return i.path })
    console.log(img)
    try {
        const data = await ImagesModel.create({ img: img, imgs: imgs })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json(e);
    }
})

app.get('/images',async(req,res)=>{
    console.log("first")
    try{
        const data=await ImagesModel.find({});
        console.log(data)
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(400).json("No image in database")
        }
    }catch(e){
        res.status(500).json(e)
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})