// WriteForm.js
import React from 'react';
import '../stylesheet/WriteForm.css'; // Importa los estilos CSS

const WriteForm = () => {
    return (
        <div className="write-form-container">
            <h2>Write Form</h2>
            <form>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" />
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content"></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default WriteForm;
