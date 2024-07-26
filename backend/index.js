import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();

// Create a connection pool
const db = mysql2.createPool({
    connectionLimit: 10,
    host: "localhost",
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

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Endpoint to add a new book
app.post("/book", async (req, res) => {
    const { title, desc, price } = req.body;
    const query = "INSERT INTO books (title, `desc`, price) VALUES (?, ?, ?)";
    const values = [title, desc, price];

    try {
        await executeQuery(query, values);
        res.json({ msg: "Book has been added." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get all books
app.get("/book", async (req, res) => {
    try {
        const data = await executeQuery("SELECT * FROM books");
        res.json(data);
    } catch (err) {
        res.json(err);
    }
});

// Endpoint to delete a book
app.delete("/book/:id", async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM books WHERE id = ?";
    const values = [id];

    try {
        await executeQuery(query, values);
        res.json({ msg: "Book has been deleted." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to update a book
app.put("/book/:id", async (req, res) => {
    const { id } = req.params;
    const { title, desc, price } = req.body;
    const query = "UPDATE books SET title = ?, `desc` = ?, price = ? WHERE id = ?";
    const values = [title, desc, price, id];

    try {
        await executeQuery(query, values);
        res.json({ msg: "Book has been updated." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend.");
});
