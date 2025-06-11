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
      <h1>PokéSearch</h1>
      <SearchBar addToFavorites={addToFavorites} />
      <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites}/>
    </div>
  )
}

export default App;
