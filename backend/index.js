import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';
import path from 'path';
//import multer from 'multer';
import { fileURLToPath } from 'url';

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Create a connection pool
const db = mysql2.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "myscheme"
});

// app.use('/tmp/my-uploads', express.static(path.join(__dirname, 'tmp/my-uploads')));


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

// Create images table if it doesn't exist
// const createImagesTable = async () => {
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS images (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             image VARCHAR(255) NOT NULL
//         );
//     `;
//     try {
//         await executeQuery(createTableQuery);
//         console.log("Images table created or already exists.");
//     } catch (err) {
//         console.error("Error creating images table:", err);
//     }
// };

// // Call the function to create the table
// createImagesTable();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './tmp/my-uploads');
//     },
//     filename: function (req, file, cb) {
//         const extension = path.extname(file.originalname);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + extension);
//     }
// });

// const upload = multer({ storage: storage });

// app.post("/api/image", upload.single('image'), async (req, res) => {
//     const bookId = req.body.book_id;
//     if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' });
//     } else {
//         const image = req.file.filename;
//         const sqlInsert = "INSERT INTO images (image, book_id) VALUES (?, ?);";
//         try {
//             await executeQuery(sqlInsert, [image, bookId]);
//             res.send({ msg: "Image added successfully" });
//         } catch (err) {
//             console.error(err);
//             res.send({ msg: err });
//         }
//     }
// });


// app.get("/api/image", async (req, res) => {
//     const bookId = req.query.book_id;
//     if (!bookId) {
//         return res.status(400).send({ msg: "book_id is required" });
//     }
    
//     const sqlSelect = "SELECT * FROM images WHERE book_id = ?;";
//     try {
//         const result = await executeQuery(sqlSelect, [bookId]);
//         if (result.length > 0) {
//             res.send({ images: result });
//         } else {
//             res.status(404).send({ msg: "No images found for this book" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ msg: err });
//     }
// });



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

// // Route to get columns from the images table
// app.get("/api/columns/images", async (req, res) => {
//     try {
//         const columns = await executeQuery("SHOW COLUMNS FROM images");
//         res.json(columns);
//     } catch (err) {
//         res.json(err);
//     }
// });

app.listen(8800, () => {
    console.log("Connected to backend.");
});
