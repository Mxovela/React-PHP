import React, { useState } from 'react';
import axios from 'axios';

const InsertForm = () => {
  const [regSeg, setRegSeg] = useState('');
  const [regNo, setRegNo] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [bayNo, setBayNo] = useState('');
  const [regYear, setRegYear] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [regDate, setRegDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost/php-backend/insert.php', {
      regSeg,
      regNo,
      receiptNo,
      bayNo,
      regYear,
      contactNo,
      address,
      regDate,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Reg Seg:</label>
      <input type="text" value={regSeg} onChange={(event) => setRegSeg(event.target.value)} />
      <br />
      <label>Reg No:</label>
      <input type="text" value={regNo} onChange={(event) => setRegNo(event.target.value)} />
      <br />
    
      <button type="submit">Insert</button>
    </form>
  );
};

export default InsertForm;