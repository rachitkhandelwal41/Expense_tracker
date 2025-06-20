import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateToken=(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
)=>{
  const authHeader = req.headers["authorization"]; 
  const token = authHeader;

  if (!token) {
     res.status(401).json({ message: "No token provided" });
     return
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || typeof decoded === "string") {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.userId = (decoded as JwtPayload).userId;
    next();
    
  });
}
