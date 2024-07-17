import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const InquiryForm = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    address: '',
    city: '',
    pinCode: '',
    photo: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photo' && files[0]) {
      const file = files[0];
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 2) {
        setError('Photo size should be less than 2MB');
        return;
      } else {
        setError('');
        setFormData({
          ...formData,
          [name]: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const res = await fetch('/inquiries', {
        method: 'POST',
        body: formDataObj,
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      window.alert('Inquiry submitted successfully');
      console.log('Inquiry submitted successfully', data);
      navigate('/'); 
    } catch (error) {
      window.alert('Submission failed');
      console.log('Submission failed', error);
    }
  };


  

  return (
    <div className="main-section">
      <div className="wrapper">
        <div className="form-left">
          <h2>Notice</h2>
          <p className="notice">
            The photo size should be less than 2MB.
          </p>
        </div>
        <div className="form-right">
          <h2>Inquiry Form</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label>Contact No.:</label>
              <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label>Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label>Pin Code:</label>
              <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label>Photo of Object:</label>
              <input type="file" name="photo" onChange={handleChange} accept="image/*" required className="input-field" />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="register">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
