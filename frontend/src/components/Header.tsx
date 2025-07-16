import './Header.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import type { HeaderProps } from '../types/HeaderProps';
import type { User } from '../types/UserProps';
import API from '../services/api';



const Header: React.FC<HeaderProps> = ({ onOpenModal, totalCount, activeCount }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    if (!name || !email) {
      alert('Введіть ім’я та email');
      return;
    }

    try {
      const res = await API.post('/users/loginOrCreate', { name, email });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (error) {
      console.error('Login error', error);
      alert('Не вдалося увійти');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="login-container">
        <h2>Вхід</h2>
        <input
          type="text"
          placeholder="Ім’я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>Увійти</button>
      </div>
    );
  }




  return (
    <header>
      <div className="logo-wrapper">
        <i className="fa-solid fa-clipboard-list fa-xl"></i>
        <a href="#">
          <div className="logo">
            <h1 >Task </h1>
            <span>Manager</span>
          </div>
        </a>
      </div>
      <button
        onClick={onOpenModal}
        className="new-task-btn"
      >Нове завдання</button>
      <div className="user-login">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleLogin}>Увійти</button>
      </div>
      <div className="count-wrapper">
        <h5 className="count-item">Усього завдань:<span>{totalCount}</span> </h5>
        <h5 className="count-item">Невиконано:<span>{activeCount}</span></h5>
      </div>
    </header>
  );
}
export default Header;