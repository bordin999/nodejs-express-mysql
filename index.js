const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restful",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: err.message
            })
            return;
        }
        res.json(result);
    })

})
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
