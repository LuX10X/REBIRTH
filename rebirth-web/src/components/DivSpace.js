// DivSpace.js
import React from 'react';
import WriteForm from './WriteForm.js';
import UpdateForm from './UpdateForm.js';
import ReadForm from './ReadForm.js';
import '../stylesheet/DivSpace.css'; // Importa los estilos CSS

const DivSpace = ({ activeForm }) => {
    return (
        <div className="div-space">
            <div className="left">
                {activeForm === 'write' && <WriteForm />}
                {activeForm === 'update' && <UpdateForm />}
                {activeForm === 'read' && <ReadForm />}
            </div>
        </div>
    );
}

export default DivSpace;
