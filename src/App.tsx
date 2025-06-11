import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchBar";
import Favorites from "./components/favorites";
import type { PokemonData } from "./types/pokemon";

const App: React.FC = () => {
  // Initialize favorites from localStorage or set to an empty array
  const [favorites, setFavorites] = useState<PokemonData[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addToFavorites = (pokemon: PokemonData) => {
    // TODO: Check if the pokemon is already in favorites
    if (favorites.some(fav => fav.name === pokemon.name)) {
      alert(`${pokemon.name} is already in your favorites!`);
      return;
    }
    setFavorites([...favorites, pokemon]);
  };

  const removeFromFavorites = (name: string) => {
    setFavorites(favorites.filter(fav => fav.name !== name));
  }

  useEffect(() => {
    // Update localStorage whenever favorites change
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="app">
      <div className="header-search-container">
        <h1>PokéSearch</h1>
        <SearchBar addToFavorites={addToFavorites} />
      </div>
      <div className="favorites-bar">
        <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites}/>
      </div>
    </div>
  )
}

export default App;
