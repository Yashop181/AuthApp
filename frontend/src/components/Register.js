import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { username, password } = formData;
  const myNAv = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      // console.log(res.data); // Token received
      alert("successful",res)
      myNAv('/login')
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={username} onChange={onChange} required  placeholder='username' autoComplete='username' />
      <input type="password" name="password" value={password} onChange={onChange} required placeholder='password' autoComplete='password'  />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
