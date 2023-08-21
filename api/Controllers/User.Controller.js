import userModel from '../Models/userModel'

export const addUser = async (req,res) =>{
    try {
        
        const {name, email, password} = req.body;
        
        const createNewUser = new userModel({
            name,
            email,
            password,
        })
        
        await createNewUser.save();

        if(createNewUser){
            return res.status(200).json({Data: createNewUser, Message: "New User Created "})
        }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export const getUser = async (req, res) =>{
    try {
        const getUser = await userModel.find();

    if(getUser){
        return res.status(200).json({
            Data: getUser,
            Message: "User Data Fetch Sucessfully"
        })
    }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}