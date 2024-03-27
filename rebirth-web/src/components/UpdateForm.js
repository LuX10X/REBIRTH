// UpdateForm.js
import React from 'react';

const UpdateForm = () => {
    return (
        <div>
            <h2>Update Form</h2>
            <form>
                <label htmlFor="updateTitle">Title:</label><br />
                <input type="text" id="updateTitle" name="updateTitle" /><br />
                <label htmlFor="updateContent">Content:</label><br />
                <textarea id="updateContent" name="updateContent"></textarea><br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateForm;
