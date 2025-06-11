import React, { useEffect, useState } from 'react';

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonData {
    name: string;
    image: string;
    types: string[];
}

interface SearchBarProps {
    addToFavorites: (pokemon: PokemonData) => void;
}

const searchBar: React.FC<SearchBarProps> = ({addToFavorites}) => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [results, setResults] = useState< PokemonData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        if (searchInput.length === 0) {
            setResults(null);
            setError(null);
            return;
        }

        const fetchPokemonData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`);

                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }

                const data = await response.json();
                const pokemonResult: PokemonData = {
                    name: data.name,
                    image: data.sprites.front_default,
                    types: data.types.map((type: PokemonType) => type.type.name)
                };
                setResults(pokemonResult);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setResults(null);
            } finally {
                setLoading(false);
            }
        };
        const timer = setTimeout(fetchPokemonData, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search for a Pokémon..."
                className="search-input"
            />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {results && (
                <div className="pokemon-result">
                    <h2>{results.name}</h2>
                    <img src={results.image} alt={results.name} />
                    <p>Types: {results.types.join(', ')}</p>
                    <button onClick={() => addToFavorites(results)}>
                        Add to Favorites
                    </button>
                </div>
            )}
        </div>
    )

}; export default searchBar;