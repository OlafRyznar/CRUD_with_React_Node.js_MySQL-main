import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Books=()=> {
  const [books, setBooks]= useState([]);

  useEffect(()=>{
    const fetchAllBooks= async ()=>{
        try{
          const res=await axios.get("http://localhost:8800/book");
          console.log(res)
          setBooks(res.data);
        }catch(err){
          console.log(err);
        }
    }
    fetchAllBooks()
  },[]);

  const handleDelete= async (id)=>{
    try{
      await axios.delete("http://localhost:8800/book/"+id);
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='w-full min-h-screen h-auto bg-cover bg-center bg-gradient-to-r from-[#093028] to-[#237A57]  flex flex-col items-center'>
      <div className='w-full h-1/5 flex justify-center items-center'>
        <h1 className='underline text-4xl text-white'>My Books</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-5 p-6 w-full'>
        {books.map(book => (
          <div className='book bg-gray-200 p-4 rounded-lg shadow-lg w-3/12' key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} className='w-full h-48 object-cover rounded-t-lg' />}
            <h2 className='text-xl font-bold mt-4'>{book.title}</h2>
            <p className='text-gray-700'>{book.desc}</p>
            <span className='block mt-2 text-lg font-semibold text-indigo-600'>{book.price} zł</span>
            <div className='mt-4 flex justify-between'>
              <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={() => handleDelete(book.id)}>Delete</button>
              <Link to={`/update/${book.id}`} className='bg-yellow-500 text-white px-4 py-2 rounded-lg'>Update</Link>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-6 bg-green-200 text-white px-6 py-3 rounded-2xl'>
        <Link to="/add" className='text-black'>Add new book</Link>
      </button>
    </div>
  );
}

export default Books

