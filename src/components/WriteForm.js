// WriteForm.js
import React, { useState } from 'react';
import { addData } from '../js/writeDB.js'; // Importar la función addData desde el archivo que contiene la lógica para agregar datos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import '../stylesheet/WriteForm.css'; // Importa los estilos CSS


const WriteForm = () => {
    const [formData, setFormData] = useState({
        databaseId: '994834b0b3f54c7790f50d544c95e9e2',
        name: '',
        number: 0,
        title: '',
        score: '',
        id: '',
        //label: [],
        order: 0
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    // Función para limitar la longitud del número ingresado en el input
    const limitNumberLength = (event) => {
        const maxLength = 9; // Máximo de 9 cifras
        const input = event.target;
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength); // Limita la longitud del valor
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleScoreChange = (value) => {
        if (!formSubmitted) {
            let scoreSymbol = '';
            for (let i = 0; i < value; i++) {
                scoreSymbol += '☆'; // Agrega el símbolo de la estrella al scoreSymbol
            }
            setFormData({
                ...formData,
                score: scoreSymbol // Almacena el símbolo de la estrella en lugar del número
            });
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addData(formData.databaseId, formData);
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error al agregar datos:', error);
        }
    };

    return (
        <div className="write-form-container">
            <h2>AGREGAR NUEVO LIBRO</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={formSubmitted} />
                    </div>
                    <div className="number">
                        <label htmlFor="number">Number:</label>
                        <input type="number" id="number" name="number" min="0" onInput={limitNumberLength} value={formData.number} onChange={handleInputChange} disabled={formSubmitted} />
                    </div>
                </div>
                <div className="row">
                    <div className="title">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} disabled={formSubmitted} />
                    </div>
                </div>
                <div className="row">
                    <div className="score">
                        <label htmlFor="score">Score:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleScoreChange(value)}
                                    disabled={formSubmitted}
                                >
                                    {value <= formData.score.length ? (
                                        <FontAwesomeIcon icon={solidStar} color="#f11e22" />
                                    ) : (
                                        <FontAwesomeIcon icon={regularStar} color="#f11e22" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="id">
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} disabled={formSubmitted} />
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <label htmlFor="label">Label:</label>
                        <input type="text" id="label" name="label" list="labelOptions" /*value={formData.label} onChange={handleInputChange}*/ disabled={formSubmitted} />
                        <datalist id="labelOptions">
                        </datalist>
                    </div>
                    <div className="order">
                        <label htmlFor="order">Order:</label>
                        <input type="number" id="order" name="order" min="0" onInput={limitNumberLength} value={formData.order} onChange={handleInputChange} disabled={formSubmitted} />
                    </div>
                </div>
                <button type="submit" disabled={formSubmitted} ><strong>COMPLETED</strong></button>
            </form>
        </div>
    );
}

export default WriteForm;
