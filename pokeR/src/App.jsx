// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './assets/Components/Navbar';
import Home from './assets/Views/Home';
import Pokemones from './assets/Views/Pokemones';
import DetallePokemon from './assets/Views/DetallesPokemon';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemones" element={<Pokemones />} />
        <Route path="/pokemones/:name" element={<DetallePokemon />} />
      </Routes>
    </Router>
  );
};

export default App;
