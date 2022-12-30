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

export const getOrderInProcessList = (req, res) => {
    const token = req.cookies.accessToken;
        
    const q =
    `
        SELECT * FROM view_orders_inProcess
    `;

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const getOrderOnDeliveryList = (req, res) => {
    const token = req.cookies.accessToken;
        
    const q =
    `
        SELECT * FROM view_orders_ondelivery
    `;

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const updateOrderList = (req, res) => {
    const token = req.cookies.accessToken;
        
    const q =
    `
        UPDATE orders SET status = ? WHERE id = ?
    `;

    db.query(q, [req.body.status, req.body.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const addOrder = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const q =
        `
            CALL add_new_order(?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            req.body.costumerName,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.notes,
            "In Process",
            req.body.productId,
            parseInt(req.body.quantity),
            req.body.price,
            req.body.address,
            req.body.phoneNumber
        ]

        console.log(values)
    
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Order has been created.");
        });
    });
}