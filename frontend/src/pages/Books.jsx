import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/book");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/book/${id}`);
            setBooks(books.filter(book => book.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-[#093028] to-[#237A57] flex flex-col items-center p-6'>
            <div className='w-full h-1/5 flex justify-center items-center mb-6'>
                <h1 className='underline text-4xl text-white font-bold'>My Books</h1>
            </div>
            <button className='bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full mb-8 transition duration-300 shadow-md'>
                <Link to="/add" className='text-white font-semibold'>Add New Book</Link>
            </button>
            <div className='flex flex-wrap justify-center gap-5 w-full'>
                {books.map(book => (
                    <div className='bg-gray-300 p-6 rounded-lg shadow-lg w-full hover:scale-105 transition duration-300 sm:w-5/12 md:w-1/3 lg:w-1/4 ' key={book.id}>
                        <h2 className='text-2xl font-bold mb-2'>{book.title}</h2>
                        <p className='text-gray-700 mb-4'>{book.desc}</p>
                        <span className='block mb-4 text-lg font-semibold text-indigo-600'>{book.price} zł</span>
                        <div className='flex justify-between'>
                            <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 shadow-xl' onClick={() => handleDelete(book.id)}>Delete</button>
                            <Link to={`/update/${book.id}`} className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex justify-center transition duration-300 shadow-xl'>Update</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
