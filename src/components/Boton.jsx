import React from "react";
import 'css/boton.css';

const Boton = ({
    children,
    onClick = () => {}
}) => (
    <button className='boton' onClick={onClick}>
        { children }
    </button>
);

export default Boton;