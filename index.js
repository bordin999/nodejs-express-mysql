const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.json());

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

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id = ${id}`;
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

app.post("/add", (req, res) => {
    const users = req.body; 
    const values = users.map(user => [user.name, user.email, user.phone]);
    const sql = "INSERT INTO users (name, email, phone) VALUES ?";

    con.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                status: "error",
                message: err.message
            });
            return;
        }
        res.json(result);
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id = ${id}`;
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

app.post("/update", (req, res) => {
    const users = req.body; 
    const sql = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";

    users.forEach(user => {
        con.query(sql, [user.name, user.email, user.phone, user.id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: "error",
                    message: err.message
                });
                return;
            }
            console.log(`Updated user with ID ${user.id}`);
        });
    });

    res.json({ status: "success", message: "Users updated successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
