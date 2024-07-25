import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';


const image = req.file.filename;
const app = express();

const path = require('path');


const path = require('path');
app.post("/api/image", upload.single('image'),(req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})
    } else {
        const image = req.file.filename
        const id = 1;
        const sqlInsert = "SELECT * FROM images WHERE id = ?;"
        connection.query(sqlInsert, [id], (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    msg:err
                })
            }
            
            if (result) {
                res.send({
                    data: result,
                    msg:"Dodano zdjecie"
                });
            }
        });
    }});
    
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


app.get("/api/image", (req,res) =>{
    const id = 1;
    const sqlInsert = "SELECT * FROM images WHERE id = ?;"
    connection.query(sqlInsert, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                msg:err
            })
        }
        
        if (result) {
            res.send({
                image:result[0].image,
            });
        }
    });
})






const upload = multer({ storage: storage })

// Create a connection pool
const db = mysql2.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "myscheme"
});

// Helper function to execute queries
function executeQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

// Middleware to send data from the HTML body
app.use(express.json());
app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true, 
}));

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/book", async (req, res) => {
    try {
        const data = await executeQuery("SELECT * FROM books");
        res.json(data);
    } catch (err) {
        res.json(err);
    }
});

app.post("/book", async (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    try {
        await executeQuery(q, [values]);
        res.json("Book has been added.");
    } catch (err) {
        res.json(err);
    }
});

app.delete("/book/:id", async (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id=?";
    try {
        await executeQuery(q, [bookId]);
        res.json("Book has been deleted.");
    } catch (err) {
        res.json(err);
    }
});

app.put("/book/:id", async (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE id=?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    try {
        await executeQuery(q, [...values, bookId]);
        res.json("Book has been updated.");
    } catch (err) {
        res.json(err);
    }
});

app.listen(8800, () => {
    console.log("Connected to backend.");
});
