import React, {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null
  });
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(book)

    try {
      await axios.post('http://localhost:8800/book', book);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center bg-gradient-to-r from-[#093028] to-[#237A57] flex flex-col items-center'>
      <div className='w-full h-1/5 flex justify-center items-center'>
        <h1 className='underline text-4xl text-white'>Add book</h1>
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
        
        { <button
          className='w-2/12 mt-6 bg-green-200 text-black px-6 py-3 rounded-2xl'
          onClick={handleClick}
        >
          Add
        </button>}
      </div>
    </div>
  );
};

export default Add;
