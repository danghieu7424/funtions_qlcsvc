const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


/**
 * Cấu hình kết nối MySQL sử dụng connection pool.
 * @type {mysql.Pool}
 */

const pool = mysql.createPool({
  host: "danghieu7424.helioho.st",
  user: "danghieu7424_qlcsvc",
  password: "12345678qlcsvc@#",
  database: "danghieu7424_QLCSVC",
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
});
/**
 * Thực hiện truy vấn SQL với các tham số.
 * @param {string} query - Câu truy vấn SQL.
 * @param {Array} params - Tham số cho câu truy vấn.
 * @return {Promise} Trả về một Promise với kết quả truy vấn.
 */
function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// -------select
/**
 * API lấy thông tin phòng CNTT.
 * @route GET /api/phong_cntt
 * @returns {Object[]} Danh sách các phòng CNTT.
 */
app.get("/api/phong_cntt", async (req, res) => {
  try {
    const results =
    await queryDatabase("SELECT MAPH, TENP FROM PHONG WHERE MANG = 'CNTT'");
    res.json(results);
  } catch (err) {
    console.error("Lỗi truy vấn MySQL:", err);
    res.status(500).send("Lỗi khi truy vấn");
  }
});
/**
 * API lấy thông tin phòng DDTU.
 * @route GET /api/phong_ddtu
 * @returns {Object[]} Danh sách các phòng DDTU.
 */
app.get("/api/phong_ddtu", async (req, res) => {
  try {
    const results =
    await queryDatabase("SELECT MAPH, TENP FROM PHONG WHERE MANG = 'DDTU'");
    res.json(results);
  } catch (err) {
    console.error("Lỗi truy vấn MySQL:", err);
    res.status(500).send("Lỗi khi truy vấn");
  }
});
/**
 * API lấy thông tin phòng KTCK.
 * @route GET /api/phong_ktck
 * @returns {Object[]} Danh sách các phòng KTCK.
 */
app.get("/api/phong_ktck", async (req, res) => {
  try {
    const results =
    await queryDatabase("SELECT MAPH, TENP FROM PHONG WHERE MANG = 'KTCK'");
    res.json(results);
  } catch (err) {
    console.error("Lỗi truy vấn MySQL:", err);
    res.status(500).send("Lỗi khi truy vấn");
  }
});

// =======================================
exports.api = functions.https.onRequest(app);
