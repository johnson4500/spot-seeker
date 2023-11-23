import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const Test2 = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:3001/test', {email, password})
        .then(result => { console.log(result)
            if (result.data === "Success") {
                navigate('/home')
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
    >
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            name = "email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type= "password"
            name = "password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </Modal>
  );
};

export default Test2;