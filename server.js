const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'roundhouse.proxy.rlwy.net',
    user: 'root',
    password: 'CAAFCCE6EBHgcHfH1aad-5dce5hEGCEf',
    database: 'railway',
    port: 30736
});



db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to MySQL database');
  
      // Check if the users table exists, and create it if not
      db.query(
        "CREATE TABLE IF NOT EXISTS userss (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)",
        (err) => {
          if (err) {
            console.error('Error creating users table:', err);
          } else {
            console.log('Users table is ready');
          }
        }
      );
    }
  });

app.post('/signup',(req, res) => {
    const sql = "INSERT INTO userss (`name`,`email`,`password`) VALUES(?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    console.log(values)
    db.query(sql,[values],(err,data)=>{
        console.log(err)
        if(err) {
            return res.json("Error")
        }
        return res.json(data);
    })
})

app.post('/login',(req, res) => {
    const sql = "SELECT * FROM userss WHERE `email` = ? AND `password` = ?";

    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        console.log(err)
        if(err) {
            return res.json("Error")
        }
        if(data.length> 0){
            return res.json("Success")
        }else{
            return res.json("Fail")
        }
    })
})

app.get('/',(req,res) => {
    res.send('ok')
})

app.listen(8000, () => {
    console.log('listening');
})