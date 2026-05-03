import { useContext } from 'react';
import { GameContext } from 'context/GameProvider';
import 'css/header.css';
import logo from 'ico/logo.png';
import Timer from './Timer';

function Header() {
  return (
    <header className='header'>
      <img src={logo} alt="logo" />
      <div className="header-info">
        <span className="header-round">Round {useContext(GameContext).round}</span>
        <Timer />
      </div>
    </header>
  );
}

export default Header;
