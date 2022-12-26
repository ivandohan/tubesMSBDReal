import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getSchDetail = (req, res) => {
    const schLevelId = req.params.schLevelId;

    const q = `
    SELECT sd.*,
	    sl.level
    FROM schooldetail AS sd
    JOIN schoollevel AS sl ON (sl.id = sd.schLevelId)
    WHERE sd.schLevelId = ?
    `;

    db.query(q, [schLevelId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { ...info } = data[0];
        return res.json(info);
    });
};