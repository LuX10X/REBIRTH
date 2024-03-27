// Menu.js
import React from 'react';
import '../stylesheet/Menu.css';

const Menu = ({ showForm }) => {
    return (
        <div className="menu-container">
            <button className="menu-button" onClick={() => showForm('write')}>Write</button>
            <button className="menu-button" onClick={() => showForm('update')}>Update/Delete</button>
            <button className="menu-button" onClick={() => showForm('read')}>Read</button>
        </div>
    );
}

export default Menu;
