import React, { useState } from 'react';
import axios from 'axios';

const MainForm = () => {
    const [formData, setFormData] = useState({
        regSeq: '',
        regNo: '',
        receiptNo: '',
        bay: '',
        regYear: '',
        contact: '',
        address: '',
        regDate: ''
    });

    const [searchValue, setSearchValue] = useState('');
    const [searchField, setSearchField] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/delphi-backend/insert.php', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost/delphi-backend/search.php`, {
                params: {
                    field: searchField,
                    value: searchValue
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleClear = () => {
        setFormData({
            regSeq: '',
            regNo: '',
            receiptNo: '',
            bay: '',
            regYear: '',
            contact: '',
            address: '',
            regDate: ''
        });
    };

    return (
        <div className="container">
            <h1 className="my-4">Record Management</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">RegSeq</label>
                    <input type="text" className="form-control" name="regSeq" value={formData.regSeq} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Reg No</label>
                    <input type="text" className="form-control" name="regNo" value={formData.regNo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Receipt No</label>
                    <input type="text" className="form-control" name="receiptNo" value={formData.receiptNo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bay</label>
                    <input type="text" className="form-control" name="bay" value={formData.bay} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Reg Year</label>
                    <input type="text" className="form-control" name="regYear" value={formData.regYear} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Reg Date</label>
                    <input type="date" className="form-control" name="regDate" value={formData.regDate} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleClear}>Clear</button>
            </form>

            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label className="form-label">Search Value</label>
                    <input type="text" className="form-control" value={searchValue} onChange={handleSearchChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Search Field</label>
                    <select className="form-select" value={searchField} onChange={handleSearchFieldChange}>
                        <option value="reg_no">Reg No</option>
                        <option value="receipt_no">Receipt No</option>
                        <option value="bay_no">Bay</option>
                        <option value="reg_year">Reg Year</option>
                        <option value="contact_no">Contact</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>RegSeq</th>
                        <th>Reg No</th>
                        <th>Receipt No</th>
                        <th>Bay</th>
                        <th>Reg Year</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Reg Date</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.reg_seq}</td>
                            <td>{result.reg_no}</td>
                            <td>{result.receipt_no}</td>
                            <td>{result.bay_no}</td>
                            <td>{result.reg_year}</td>
                            <td>{result.contact_no}</td>
                            <td>{result.address}</td>
                            <td>{result.reg_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainForm;
