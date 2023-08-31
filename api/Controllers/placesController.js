import placeModle from '../Models/placeModle';
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const imageFolder = "./uploads";
      const placesImageFolder = "places";
  
      if (!fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder);
      }
  
      const mergeImageFolder = path.join(imageFolder, placesImageFolder);
  
      if (!fs.existsSync(mergeImageFolder)) {
        fs.mkdirSync(mergeImageFolder);
      }
  
      cb(null, mergeImageFolder);
    },
    filename: function (req, file, cb) {
      const imageName = file.originalname;
      const ext = path.extname(imageName);
      const imageNameArray = imageName.split(".");
      imageNameArray.pop();
      const joinName = imageNameArray.join(".");
      const updatedNameWithDate = joinName + "_" + Date.now() + ext;
      cb(null, updatedNameWithDate);
    },
  });

const upload = multer({storage});

export const addPlaces = async (req, res)=>{
    try {
        // const {imageLink} = req.body;
        const uploadImage = upload.array('photos',10)

        uploadImage(req,res, async function (err) {
            if(err){
                return res.status(501).json({Message: err.Message})
            }

            // const {
            //     title,
            //     location,
            //     description,
            //     checkIn,
            //     checkOut,
            //     maxGuests,
            //   } = req.body;
        

        let photos = [];
        // console.log(req.files)

        if(req.files){
            req.files.forEach((file) =>{
                photos.push(file.filename)
            })
        }

        // console.log("Files:", req.files);
        // console.log(photos);

        const addNewPlaces = new placeModle({
            // title: title,
            // location: location,
            // description: description,
            photos: photos.join(','),
            // checkIn: checkIn,
            // checkOut: checkOut,
            // maxGuests: maxGuests,
        })

        const validationError = addNewPlaces.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

        await addNewPlaces.save();
        if(addNewPlaces){
            return res.status(200).json({
                Data: addNewPlaces,
                Message: "New Places added Sucessfully"
            })
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