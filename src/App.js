// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import DivSpace from './components/DivSpace'; // Importa el componente DivSpace
import './App.css'; // Importa el archivo CSS para los estilos de la página

function App() {
  const [activeForm, setActiveForm] = useState(null);

  const showForm = (form) => {
      setActiveForm(form);
  }

  return (
    <div className="App">
      <Header />
      <Menu showForm={showForm} />
      <DivSpace activeForm={activeForm} />
    </div>
  );
}

export default App;
