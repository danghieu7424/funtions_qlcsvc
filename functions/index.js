const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "danghieu7424.helioho.st",
  user: "danghieu7424_qlcsvc",
  password: "12345678qlcsvc@#",
  database: "danghieu7424_QLCSVC",
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL:", err);
  } else {
    console.log("Kết nối MySQL thành công!");
  }
});

// -------select

app.get("/api/phong_cntt", (req, res) => {
  db.query("SELECT MAPH, TENP FROM PHONG WHERE MANG = 'CNTT'",
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL:", err);
          res.status(500).send("Lỗi khi truy vấn");
          return;
        }
        res.json(results);
      });
});
app.get("/api/phong_ddtu", (req, res) => {
  db.query("SELECT MAPH, TENP FROM PHONG WHERE MANG = 'DDTU'",
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL:", err);
          res.status(500).send("Lỗi khi truy vấn");
          return;
        }
        res.json(results);
      });
});
app.get("/api/phong_ktck", (req, res) => {
  db.query("SELECT MAPH, TENP FROM PHONG WHERE MANG = 'KTCK'",
      (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn MySQL:", err);
          res.status(500).send("Lỗi khi truy vấn");
          return;
        }
        res.json(results);
      });
});

// =======================================
exports.api = functions.https.onRequest(app);
