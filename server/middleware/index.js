const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if(user){
        req.user = user;
      }else{
        return res.status(403).json({ message: "Unauthorized Access", error: true });
      }
    } else {
      return res.status(400).json({ message: "Authorization required", error: true });
    }
    next();
    //jwt.decode()
  };