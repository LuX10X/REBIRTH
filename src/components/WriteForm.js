// WriteForm.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import '../stylesheet/WriteForm.css'; // Importa los estilos CSS



const WriteForm = () => {
    const [score, setScore] = useState(0); // Estado para almacenar la puntuación seleccionada
    const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si el formulario ha sido enviado

    // Función para limitar la longitud del número ingresado en el input
    const limitNumberLength = (event) => {
        const maxLength = 9; // Máximo de 9 cifras
        const input = event.target;
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength); // Limita la longitud del valor
        }
    };

    // Función para manejar el cambio de puntuación
    const handleScoreChange = (value) => {
        if (!formSubmitted) {
            setScore(value);
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    };

    return (
        <div className="write-form-container">
            <h2>AGREGAR NUEVO LIBRO</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" disabled={formSubmitted} />
                    </div>
                    <div className="number">
                        <label htmlFor="number">Number:</label>
                        <input type="number" id="number" name="number" min="0" onInput={limitNumberLength} disabled={formSubmitted} />
                    </div>
                </div>
                <div className="row">
                    <div className="title">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" disabled={formSubmitted} />
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
                                    {value <= score ? (
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
                        <input type="text" id="id" name="id" disabled={formSubmitted} />
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <label htmlFor="label">Label:</label>
                        <input type="text" id="label" name="label" list="labelOptions" disabled={formSubmitted} />
                        <datalist id="labelOptions">
                        </datalist>
                    </div>
                    <div className="order">
                        <label htmlFor="order">Order:</label>
                        <input type="number" id="order" name="order" min="0" onInput={limitNumberLength} disabled={formSubmitted} />
                    </div>
                </div>
                <button type="submit" disabled={formSubmitted} ><strong>COMPLETED</strong></button>
            </form>
        </div>
    );
}

export default WriteForm;
