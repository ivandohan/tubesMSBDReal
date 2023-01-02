import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getGeneralPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q = userId !== "undefined"
    ?
    `SELECT * FROM view_general_posts WHERE userId = ?`
    :
    `
      SELECT * FROM view_general_posts
    `;

    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?

    const values =
      userId !== "undefined" ? [userId] : [];
      // userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  // });
};

export const getEventPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");

    const q = userId !== "undefined"
    ?
    `SELECT * FROM view_general_posts WHERE userId = ?`
    :
    `
    SELECT * FROM view_general_posts WHERE category="event"
    `;

    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?

    const values =
      userId !== "undefined" ? [userId] : [];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  // });
};

export const getAchPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");

    const q = userId !== "undefined"
    ?
    `SELECT * FROM view_achievement_posts WHERE userId = ?`
    :
    `
    SELECT * FROM view_general_posts WHERE category="achievement"
    `;

    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?

    const values =
      userId !== "undefined" ? [userId] : [];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  // });
};

export const getLogPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const q = `
        SELECT * FROM log_activities ORDER BY insertedAt DESC
      `

      db.query(q, [], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
      });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "CALL add_new_post(?)";
    
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.category
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};

export const reportPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO reportedposts VALUES(?, ?)";

    db.query(q, [req.body.postId, req.body.reportedBy], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been reported.");
      return res.status(403).json("You can delete only your post")
    });
  });
};

export const getReportedPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "SELECT * FROM view_detail_reportedpost";

    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
