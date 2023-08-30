import placeModle from '../Models/placeModle';
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const imageFolder = '../Uploads';
        const placesImageFolder = 'PlacesImagesFolder';

        if(!fs.existsSync(imageFolder)){
            fs.mkdirSync(imageFolder);
        }

        const mergeImageFolder = path.join(imageFolder, placesImageFolder);

        if(!fs.existsSync(mergeImageFolder)){
            fs.mkdirSync(mergeImageFolder);
        }

        cb(null, mergeImageFolder)
    },

    filename: function (req, file, cb){
        const imageName = file.originalname;
        const ext = path.extname(imageName);
        const imageNameArray = imageName.split('.');
        imageNameArray.pop();
        const joinName = imageNameArray.join('.');
        const updatedNameWithDate = joinName + '-' + Date.now() + ext;
        cb(null, updatedNameWithDate);
    }
})


const upload = multer({storage})

export const addPlaces = async (req, res)=>{
    try {
        const {imageLink} = req.body;
        const uploadImage = upload.array('photos',10)

        uploadImage(req,res, function (err) {
            if(err){
                return res.status(501).json({Message: err.Message})
            }
        })
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const getAllPlaces = async (req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const updatePlaces = async (req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const deletePlaces = async (req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}