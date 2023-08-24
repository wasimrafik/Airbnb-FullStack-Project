import jwt from 'jsonwebtoken';

const auth = async (req, res, next) =>{
    try {
        if (req.headers.authorization) {
          const token = req.headers.authorization;
          console.log("Received Token:", token);
          const decodedToken = jwt.verify(token, "secrectKey");
    
          if (decodedToken) {
            console.log("Decoded Token:", decodedToken);
            // Attach decoded user data to res.locals
            res.locals.user = decodedToken;
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