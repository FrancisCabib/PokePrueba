// views/Pokemones.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './pokemon.css';

const Pokemones = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar la lista de Pokémon:", error);
        setLoading(false);
      });
  }, []);

  const handlePokemonChange = (event) => {
    setSelectedPokemon(event.target.value);
  };

  const handleVerDetalle = () => {
    if (selectedPokemon) {
      navigate(`/pokemones/${selectedPokemon}`);
    }
  };

  return (
    <Container className="pokemon-container">
      <Row>
        <Col md={8} className="mx-auto">
          <h1 className="text-center">Selecciona un Pokémon</h1>
          {loading ? (
            <Spinner animation="border" role="status" className="d-block mx-auto">
              <span className="sr-only">Cargando...</span>
            </Spinner>
          ) : (
            <Form className="text-center">
              <Form.Group controlId="pokemonSelect" className="mb-3">
                <Form.Control as="select" value={selectedPokemon} onChange={handlePokemonChange} className="mx-auto w-auto">
                  <option value="">Selecciona un Pokémon</option>
                  {pokemons.map((pokemon, index) => (
                    <option key={index} value={pokemon.name}>
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={handleVerDetalle} disabled={!selectedPokemon} className="d-block mx-auto">
                Ver Detalle
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Pokemones;
