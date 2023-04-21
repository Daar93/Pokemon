import { useEffect, useState } from "react";

function createGif(pokemon, i=1) {
    const frontGifUrl = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
    return <img src={ frontGifUrl } key={ i } id="encounter" className="pokemon"/>;
};

export default function WildPokemon({ chosenWildPokemon }) {
    const [wildPokemon, setWildPokemon] = useState(null);
    
    useEffect(() => {
        const wildPokemonUrl = chosenWildPokemon.pokemon.url;
        
        fetch(wildPokemonUrl)
            .then(res => res.json())
            .then(data => setWildPokemon(data));
    }, []);
    // const frontGifUrl = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;

    return <>
    <div className="wild-pokemon">
        { wildPokemon && createGif(wildPokemon) }
    </div>
    </> 
} 