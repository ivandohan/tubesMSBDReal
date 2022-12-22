import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getMarketPlace = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q =
        `
            SELECT * FROM view_products
        `;
    
        db.query(q, [], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}