"use client"
import { Modal } from 'antd'
import React, { useState } from 'react'
import { Protest_Strike } from 'next/font/google'
const inter = Protest_Strike({ subsets: ['latin'], weight: '400' })
import MySvgIcon from './MySvgIcon'
import {
  create_post,
} from './contextapi/api'
import { useStateContext } from './contextapi/stateContext'


const Header = () => {
  const { setPosts } = useStateContext();
  const [vis, setVis] = useState(false);
  const [form, setForm] = useState({});
  const [image, setImg] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is a file input
    if (name === 'file') {
      const selectedFile = files[0];

      // Define allowed file types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

      // Validate the file type
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only JPEG, JPG, PNG, GIF & WEBP formats are allowed.');
        e.target.value = ''; // Reset the input field
        return;
      }

      // Update the form state with the file
      setForm((prevForm) => ({
        ...prevForm,
        [name]: selectedFile
      }));

    } else {
      // Handle other inputs (e.g., title)
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    }
  };


  const handleForm = async (e) => {
    e.preventDefault();
    setLoader(true)
    var device_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (localStorage.getItem('device_id')) {
      var device_id = localStorage.getItem('device_id');
    } else {
      localStorage.setItem('device_id', device_id);
    }

    const res = await create_post({
      ...form,
      device_id,
    });

    if (res?.success) {
      console.log(res);
      setPosts(prev => ([res?.data, ...prev]));

      setLoader(false);
      setForm({});
      setVis(false);
    }

  }


  const getLocationName = async (latitude, longitude) => {

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();

    const dataFormat = {
      countryName: data.countryName,
      city: data.city,
      locality: data.locality,
      latitude: latitude,
      longitude: longitude
    }
    return JSON.stringify(dataFormat);
  }

  const handleOpen = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const loc = await getLocationName(position.coords.latitude, position.coords.longitude);

        setForm({
          ...form,
          location: loc
        })

        setVis(true);

      }, (error) => {
        console.log(error)
      })
    }
  }



  return (
    <div className="sticky select-none shadow top-0 h-[80px] flex items-center px-6 bg-white z-30 justify-between">
      <Modal open={vis} footer={null} onCancel={() => setVis(false)}>
        <form onSubmit={handleForm}>
          <label className="block">
            Title
            <input value={form.title} onChange={handleChange} type="text" name="title" className="block w-full mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500" />
          </label>

          <label className="block mt-4">
            Image
            <input onChange={handleChange} type="file" name="file" className="block w-full mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500" />
          </label>
          <button type="submit" className="mt-4 w-full flex justify-center items-center gap-3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Upload
            {
              loader ? <div className="flex text-2xl">
                <span className='animate-bounce'>.</span><span className='animate-bounce'>.</span><span className='animate-bounce'>.</span><span className='animate-bounce'>.</span>
              </div> : null

            }
          </button>
        </form>
      </Modal>

      <a href="/">
        <div className={`${inter.className} text-2xl sm:text-3xl flex items-center`}>
          Mahwa Gallery  <img src='/ads.gif' className="sm:w-[70px] w-[50px]" alt="महवा में दशहरा उत्सव" />
        </div>
      </a>

      <div onClick={handleOpen} className="flex cursor-pointer flex-col items-center justify-center">
        <MySvgIcon />
        <div className='text-[12px] text-gray-400 hover:text-gray-500'>
          Upload here
        </div>
      </div>
    </div>
  )
}

export default Header