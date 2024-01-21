// views/Home.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import './pokemon.css'; // Asegúrate de que este es el archivo CSS correcto

const Home = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomPokemonId = Math.floor(Math.random() * 150) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar un Pokémon aleatorio:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col xs={12} className="text-center">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Cargando...</span>
            </Spinner>
          ) : (
            <>
              <h1>Bienvenido al mundo Pokémon</h1>
              <h2>¡Pokémon del día!</h2>
              <Image src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-imagen" />
              <p className="mt-3">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
