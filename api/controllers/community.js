import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getCommunities = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `
        SELECT id, userId, fullname, motto, year FROM communitydetails
        `

        db.query(q, [], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const getCommunityDetails = (req, res) => {
    const comId = req.params.comId;
    console.log(comId)
    const q = `
        SELECT * FROM view_community_details WHERE userId = ?
    `;

    db.query(q, [comId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};