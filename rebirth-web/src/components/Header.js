// Header.js
import React from 'react';
import fondoDBLocal from '../images/FONDO_DBLOCAL.png'; // Importa la imagen
import '../stylesheet/Header.css'; // Importa el archivo CSS para los estilos del componente


const Header = () => {
    return (
        <div className="header">
            <img src={fondoDBLocal} alt="Fondo" className="header-image" />
        </div>
    );
}

export default Header;
