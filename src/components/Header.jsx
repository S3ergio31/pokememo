import React, { useContext } from 'react';
import { GameContext } from 'context/GameProvider';
import 'css/header.css';
import logo from 'ico/logo.png';
import Timer from './Timer';

const Header = () => (
    <header className='header'>
        <img src={logo} alt="logo" />
        <div>
            Round: { useContext(GameContext).round }
            <Timer />
        </div>
    </header>
);

export default Header;