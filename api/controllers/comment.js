import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `
    SELECT * FROM view_comments WHERE postId = ? ORDER BY createdAt DESC
  `;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments(`descr`, `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;

  const commentId = req.params.id;
  const q = "DELETE FROM comments WHERE `id` = ?";

  db.query(q, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("Comment has been deleted!");
    return res.status(403).json("You can delete only your comment!");
  });
};

export const reportedComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO reportedcomments VALUES(?, ?)";

    db.query(q, [req.body.commentId, req.body.reportedBy], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been reported.");
      return res.status(403).json("You can delete only your post")
    });
  });
};
