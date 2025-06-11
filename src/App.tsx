import "./App.css";
import React, { useState } from "react";
import SearchBar from "./components/searchBar";
import Favorites from "./components/favorites";
import type { PokemonData } from "./types/pokemon";

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<PokemonData[]>([]);

  const addToFavorites = (pokemon: PokemonData) => {
    //if (favorites.some(fav => fav.name === pokemon.name)) return;
    setFavorites([...favorites, pokemon]);
  };

  return (
    <div className="app">
      <SearchBar addToFavorites={addToFavorites} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
