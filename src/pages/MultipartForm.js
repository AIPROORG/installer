import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../utils/endpoints';

const MultipartForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await axios.post(endpoints.home_page.add_bg_image, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};
export default MultipartForm;