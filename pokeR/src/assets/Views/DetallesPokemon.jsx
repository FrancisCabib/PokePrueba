// views/DetallePokemon.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Card, ListGroup, Image } from 'react-bootstrap';
import './pokemon.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta y tenga este nombre

const DetallePokemon = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPokemonDetails(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar detalles del Pokémon:", error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <Container className="detalle-pokemon-container">
        <Spinner animation="border" role="status">
          <span className="sr-only">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="detalle-pokemon-container">
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src={pokemonDetails.sprites.front_default} />
            <Card.Body>
              <Card.Title>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</Card.Title>
              <Card.Text>
                <strong>Altura:</strong> {pokemonDetails.height} decimetres
                <br />
                <strong>Peso:</strong> {pokemonDetails.weight} hectograms
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {pokemonDetails.types.map((type, index) => (
                <ListGroup.Item key={index}>{type.type.name.toUpperCase()}</ListGroup.Item>
              ))}
              {pokemonDetails.abilities.map((ability, index) => (
                <ListGroup.Item key={index}>{ability.ability.name.toUpperCase()}</ListGroup.Item>
              ))}
              {pokemonDetails.stats.map((stat, index) => (
                <ListGroup.Item key={index}>
                  {stat.stat.name.toUpperCase()}: {stat.base_stat}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetallePokemon;
