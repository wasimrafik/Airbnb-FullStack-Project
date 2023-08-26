import jwt from 'jsonwebtoken';

const auth = async (req, res, next) =>{
    try {
      console.log(req.cookies.secrectKey);
        if (req.cookies.secrectKey) {
          const token = req.cookies.secrectKey;

          // console.log("Received Token:", token);
          const decodedToken = jwt.verify(token, "secrectKey");
    
          if (decodedToken) {
            // console.log("Decoded Token auth:", decodedToken);
            req.auth = decodedToken;
            next();
          } else {
            return res.status(500).json({
              Message: "Invalid Token"
            });
          }
        } else {
          return res.status(500).json({
            Message: "Missing Authorization Token",
          });
        }
      } catch (error) {
        return res.status(500).json({ Message: error.message });
      }
}

export default auth;