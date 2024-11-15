import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModels.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

// check the user if it is admin

const autorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "you are not admin" });
  }
};

export { authenticate, autorizedAdmin };

// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(401).json({ message: "Invalid token" });
//       } else {
//         req.userId = decoded.userId;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "No token provided" });
//   }
// };

// export default authMiddleware;
