import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
    });

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/book/${bookId}`, {
                title: book.title,
                desc: book.desc,
                price: book.price
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-full h-full bg-cover bg-center bg-gradient-to-r from-[#093028] to-[#237A57] flex flex-col items-center'>
            <div className='w-full h-1/5 flex justify-center items-center'>
                <h1 className='underline text-4xl text-white'>Update the book</h1>
            </div>
            <div className='w-full h-screen flex flex-col items-center justify-center gap-6'>
                <input
                    className='w-4/12 h-10 rounded-xl'
                    type='text'
                    placeholder='Title'
                    onChange={handleChange}
                    name='title'
                />
                <input
                    className='w-4/12 h-10 rounded-xl'
                    type='text'
                    placeholder='Description'
                    onChange={handleChange}
                    name='desc'
                />
                <input
                    className='w-4/12 h-10 rounded-xl'
                    type='number'
                    placeholder='Price'
                    onChange={handleChange}
                    name='price'
                />
                <button
                    className='w-2/12 mt-6 bg-green-200 text-black px-6 py-3 rounded-2xl'
                    onClick={handleClick}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default Update;
