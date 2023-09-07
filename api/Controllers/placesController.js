import placeModle from '../Models/placeModle';
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import userModel from '../Models/userModel';

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

export const addPlace = async (req, res) => {
    try {
      const ownerID = req.auth.id;
  
      const uploadImage = upload.array('photos', 10);
  
      uploadImage(req, res, async function (err) {
        if (err) {
          return res.status(501).json({ Message: err.message });
        }
        // console.log(ownerID);
        // console.log(req.files);
        const {
          title,
          location,
          description,
          address,
          checkIn,
          extraInfo,
          price,
          checkOut,
          maxGuests,
          perks,
        } = req.body;
  
        // Use req.files to access uploaded files
        let photos = [];
  
        if (req.files) {
          req.files.forEach((file) => {
            photos.push(file.filename);
          });
        }
  
        const addNewPlaces = new placeModle({
          photos: photos.join(','), // Join the array of photo filenames into a comma-separated string
        });
  
        const addNewPlace = new placeModle({
          owner: ownerID,
          title,
          location,
          address,
          description,
          checkIn,
          checkOut,
          price,
          extraInfo,
          maxGuests,
          perks: perks.split(','),
          photos, // Add the photos array to the place document
        });
  
        const validationError = addNewPlace.validateSync();
        if (validationError) {
          return res.status(400).json({ message: validationError.message });
        }
  
        await addNewPlace.save();
  
        if (addNewPlace) {
          return res.status(200).json({
            Data: addNewPlace,
            Message: 'New Place added Successfully',
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        Message: error.message,
      });
    }
  };
  
  

export const getAllPlaces = async (req, res)=>{
    try {
        const userID = req.auth.id;
        // console.log(userID);
        
        const getAllPlaces = await placeModle.find({ owner: userID });

        console.log(getAllPlaces);
        return res.json({Data: getAllPlaces, Message:"All Places Fetch Sucessfully"})

    } catch (error) {
        return res.status(500).json({
            Message: error.Message  
        })
    }
}

export const getSingleUser = async (req, res)=>{
  try {

    const userID = req.params.id;
    
    const getSingleUser = await placeModle.findById(userID)
    if(getSingleUser){
      return res.status(200).json({Data: getSingleUser, Message: "Single User Fetch Sucessfully"})
    }
      
  } catch (error) {
      return res.status(500).json({
          Message: error.Message
      })
  }
}


export const updatePlaces = async (req, res) => {
  try {
    const ownerID = req.auth.id;
    const uploadImage = upload.array('photos', 10);

    uploadImage(req, res, async function (err) {
      if (err) {
        return res.status(501).json({ Message: err.message });
      }

      const id = req.params.id;
      const findUser = await placeModle.findOne({ _id: ownerID });

      const {
        title,
        location,
        description,
        address,
        checkIn,
        extraInfo,
        checkOut,
        price,
        maxGuests,
        perks,
      } = req.body;

      let photos = [];

      if (req.files !== undefined) {
        req.files.forEach((file) => {
          photos.push(file.filename);
        })};

        // Delete old images
        if (findUser && findUser.photos) {
          const oldImagePath = './uploads/places/' + findUser.photos;
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

      // Update the document in the database
      const updateFields = {
        title,
        location,
        description,
        address,
        checkIn,
        extraInfo,
        checkOut,
        price,
        maxGuests,
        perks,
        photos, // Assign the array of filenames to the photos field
      };

      console.log(updateFields);
      const updatePlaces = await placeModle.updateOne({ _id: id }, { $set: updateFields });
      console.log(updatePlaces);
      if (updatePlaces.acknowledged) {
        return res.status(201).json({ Data: updatePlaces, Message: "Places updated successfully" });
      }
    });
  } catch (error) {
    return res.status(505).json({
      Message: error.message,
    });
  }
};


export const deletePlaces = async (req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            Message: error.Message
        })
    }
}

export const getAllPlacesForHomePage = async (req, res)=>{
  try {
      
      const getAllPlaces = await placeModle.find();

      console.log(getAllPlaces);
      return res.json({Data: getAllPlaces, Message:"All Places Fetch For Home Sucessfully"})

  } catch (error) {
      return res.status(500).json({
          Message: error.Message  
      })
  }
}