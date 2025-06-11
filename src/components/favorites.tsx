import React from 'react';
import './favorites.css';

interface PokemonData {
    name: string;
    image: string;
    types: string[];
}

interface FavoritesProps {
    favorites: PokemonData[];
    removeFromFavorites: (name: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, removeFromFavorites }) => {
    return (
        <div className="favorites">
            <h2>Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
               <div className="flex flex-wrap gap-4">
                    {favorites.map(fav => (
                        <div key={fav.name} className="fav-item">
                            <img src={fav.image} alt={fav.name} className="fav-item-pic" />
                            <h4 className="fav-item-name">{fav.name}</h4>
                            <button
                                className="remove-button"
                                onClick={() => removeFromFavorites(fav.name)}
                                title="Remove from favorites"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Favorites;