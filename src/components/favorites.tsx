import React from 'react';

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
                        <div key={fav.name} className="border p-2 rounded text-center shadow relative">
                            <button
                                className="remove-button"
                                onClick={() => removeFromFavorites(fav.name)}
                                title="Remove from favorites"
                            >
                                &times;
                            </button>
                            <h4 className="capitalize">{fav.name}</h4>
                            <img src={fav.image} alt={fav.name} className="w-16 h-16 mx-auto my-1" />
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Favorites;