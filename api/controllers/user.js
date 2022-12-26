import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;

  const q = `
    SELECT * FROM view_user_info
    WHERE id = ?
  `;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const {...info } = data[0];
    return res.json(info);
  });
};

export const getUserByUsername = (req, res) => {
  const username = req.params.username;

  const q = `
    SELECT id FROM users
    WHERE username = ?
  `;

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    const {...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE userdetails SET `name`=?,`profilePic`=?,`coverPic`=? WHERE userId=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};
