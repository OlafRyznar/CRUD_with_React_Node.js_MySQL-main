import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [uploadStatus, setUploadStatus] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  // Fetch image URL when the component mounts
  useEffect(() => {
    fetch('http://localhost:8800/api/image', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setImage('http://localhost:8800/' + data.image);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  // Handle image file upload
  const imageHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:8800/api/image', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setUploadStatus(res.msg);
        // Optionally update cover field if needed
        setBook((prev) => ({ ...prev, cover: res.file.path }));
      })
      .catch((err) => {
        console.error('Error uploading image:', err);
      });
  };

  // Handle input field changes
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
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
        <input
          className='w-4/12 h-10 rounded-xl'
          type='file'
          name='image'
          accept='image/*'
          multiple={false}
          onChange={imageHandler}
        />
        <h2>{uploadStatus}</h2>
        <button
          className='w-2/12 mt-6 bg-green-200 text-black px-6 py-3 rounded-2xl'
          onClick={handleClick}
        >
          Add
        </button>
      </div>
      {image && <img src={image} alt="Uploaded Preview" />}
    </div>
  );
};

export default Add;
