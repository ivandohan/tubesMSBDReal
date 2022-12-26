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

export const addOrder = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q =
        `
            CALL add_new_order(?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            req.body.costumerName,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.notes,
            req.body.status,
            req.body.productId,
            parseInt(req.body.quantity),
            req.body.price,
            req.body.address,
        ]

        console.log(values)
    
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Order has been created.");
        });
    });
}