import React from "react";
import 'css/button.css';

const Button = ({
    children,
    onClick = () => {}
}) => (
    <button className='button' onClick={onClick}>
        { children }
    </button>
);

export default Button;