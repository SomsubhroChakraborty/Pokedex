import React, { useState, useEffect } from 'react';

const pokedexCardStyle = {
  width: '263px',
  backgroundColor: 'black', // Change the background color here
  border: '3px solid rgb(113 6 229)',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  color: 'white',
  display: 'flex', // Use flexbox
  flexDirection: 'column', // Stack content vertically
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  margin: 'auto',
  height: '320px',
};

const pokemonImageStyle = {
  maxWidth: '100%',
};

const searchStyle = {
  width: '347px', // Set the width to a smaller value
  backgroundColor: 'black',
  border: '2px solid purple',
  padding: '10px 15px', // Adjust padding for a smaller size
  borderRadius: '20px', // Adjust the border radius for a rounder shape
  margin: '30px auto', // Center the search input
  color: 'white',
  opacity: '0.8',
  display: 'block', // Make sure it takes full width
};

const inputPlaceholderStyle = {
  color: 'white',
};

const pokemonNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const pokemonTypeStyle = {
  fontSize: '16px',
  marginTop: '10px',
};

const h1Style = {
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  color: 'white',
  fontSize: '50px',
};

const h6Style = {
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '20px',
  textAlign: 'center', // Center the subtitle
  color: 'white',
};

function Pokedex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setPokemonData(null);
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setPokemonData(null);
      });
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1 style={h1Style}>Pokedex</h1>
      <h6 style={h6Style}>Let's start the Pokemon journey</h6>
      <input
        className="search"
        type="text"
        placeholder="Search Pokémon by name"
        value={searchQuery}
        onChange={handleSearchChange}
        style={searchStyle}
      />
      {pokemonData && (
        <div style={pokedexCardStyle}>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            style={pokemonImageStyle}
          />
          <h2 style={pokemonNameStyle}>{pokemonData.name}</h2>
          <p style={pokemonTypeStyle}>
            Types: {pokemonData.types.map((type) => type.type.name).join(', ')}
          </p>
        </div>
      )}
      {pokemonData === null && searchQuery.trim() !== '' && (
        <p>No Pokémon found for '{searchQuery}'</p>
      )}
    </div>
  );
}

export default Pokedex;
