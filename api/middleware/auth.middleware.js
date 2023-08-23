import jwt from 'jsonwebtoken';

const auth = async (req, res, next) =>{
    try {
        if(req.header.authorization){
            let token = req.header.authorization;
            let decodeToken = jwt.verify(token, "secrectKey");
            if(decodeToken){
                next();
            }else{
                return res.status(500).json({
                    Message: "Invalid Token"
                })
            }
        }else{
            return res.status(500).json({
                Message: "Invalid DecodeToken",})
        }
    } catch (error) {
        return res.status(500).json({Message: error.Message})
    }
}

export default auth;