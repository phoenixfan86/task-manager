import './Header.css';
import type React from 'react';
import type { HeaderProps } from '../types/HeaderProps';



const Header: React.FC<HeaderProps> = ({ onOpenModal, totalCount, activeCount }) => {
  return (
    <header>
      <div className="logo">
        <i className="fa-solid fa-clipboard-list fa-xl"></i>
        <a href="#">
          <h1>Task <span>Manager</span></h1>
        </a>
      </div>
      <button onClick={onOpenModal}>Нове завдання</button>
      <div className="count-wrapper">
        <h5 className="count-item">Усього завдань:<span>{totalCount}</span> </h5>
        <h5 className="count-item">Невиконано:<span>{activeCount}</span></h5>
      </div>
    </header>
  );
}
export default Header;