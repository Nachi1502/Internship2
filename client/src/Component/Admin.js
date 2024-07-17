import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [userAllData, setUserAllData] = useState([]);
  const [inquiryData, setInquiryData] = useState([]);

  const callAdminPage = async () => {
    try {
      const res = await fetch('/admin', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      setUserAllData(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchInquiryData = async () => {
    try {
      const res = await fetch('/inquiries', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials for authentication
      });

      const data = await res.json();
      setInquiryData(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    callAdminPage();
    fetchInquiryData();
  }, []);

  return (
    <div className='main-section1'>
      <div className='mt-5'>
        <h2>User Data</h2>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email ID</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Profession</th>
            </tr>
          </thead>
          {userAllData.length === 0 ? (
            <p>Loading...</p>
          ) : (
            userAllData.map((ele) => (
              <tbody key={ele.email}>
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.phone}</td>
                  <td>{ele.work}</td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>

      <div className='mt-5'>
        <h2>Inquiry Data</h2>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Contact No.</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Pin Code</th>
              <th scope="col">Photo</th>
            </tr>
          </thead>
          {inquiryData.length === 0 ? (
            <p>Loading...</p>
          ) : (
            inquiryData.map((ele) => (
              <tbody key={ele._id}>
                <tr>
                  <td>{ele.name}</td>
                  <td>{ele.contactNo}</td>
                  <td>{ele.address}</td>
                  <td>{ele.city}</td>
                  <td>{ele.pinCode}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${ele.photo}`}
                      alt="Inquiry"
                      width="100"
                    />
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default Admin;
