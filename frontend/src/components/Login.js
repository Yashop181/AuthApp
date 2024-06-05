import React, { useState } from 'react';
import API from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      // console.log(res.data); // Token received
      alert("Login Successful",res);
      
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={username} onChange={onChange} required placeholder='username' autoComplete='username'  />
      <input type="password" name="password" value={password} onChange={onChange} required  placeholder='password' autoComplete='password' />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
