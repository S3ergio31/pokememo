import React, { useContext } from 'react';
import { GameContext } from 'context/GameProvider';
import 'css/header.css';
import logo from 'ico/logo.png';

const Header = () => (
    <header className='header'>
        <img src={logo} alt="logo" />
        Ronda: { useContext(GameContext).ronda }
    </header>
);

export default Header;