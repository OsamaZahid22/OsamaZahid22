const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser')
app.use(express.json());


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//database connection

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'facebook',
});

//get data
app.get('/get', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//insert data
app.post('/insert', (req, res) => {

    const name = req.body.name
    const contact = req.body.contact
    const email = req.body.email

    db.query('INSERT INTO students (name, contact, email) VALUES (?,?,?)',
        [name, contact, email], (err, result) => {
            if (err) {
                console.log(err);
            } else {

                res.send(result);
            }
        });
});

// delete row

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM students WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  

// update row
app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    
    db.query("UPDATE students SET  name = ?, contact = ?, email = ? WHERE id = ?",
      [name , contact, email, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });


app.listen(3001, () => {

    console.log("server is running on port 3001");
})