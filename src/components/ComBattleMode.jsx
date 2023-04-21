import { useState, useEffect } from "react";

import WildPokemon from "./ComWildPokemon";

const playerPokemons = ["charmander", "squirtle", "bulbasaur"];
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

function createPlayerGif(pokemon, i=1) {
    console.log(pokemon);
    const backGifUrl = pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default;

    return <img src={ backGifUrl } key={ i } id="player-pokemon" className="pokemon"/>;
};

function chooseRandomPokemonIndex(data) {
    return Math.floor(Math.random() * data.pokemon_encounters.length);
};

export default function BattleMode({ chosenAreasPokemonsUrl }) {
    const [playerPokemonData, setPlayerPokemonData] = useState([]);
    const [wildPokemon, setWildPokemon] = useState(null);
    const [fightingPokemon, setFightingPokemon] = useState(null);

    function fetchPokemonDetails(pokemonName) {
        return fetch(pokemonUrl + pokemonName)
                .then(res => res.json())
                .then(data => data)
    };

    function handleClick(event) {
        const idx = event.target.id;
        const backGifUrl = playerPokemonData[idx];
        console.log(backGifUrl);
        setFightingPokemon(backGifUrl);
    };

    function createBoxGif(pokemon, i=1) {
        const frontGifUrl = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
        
        return (
            <img 
                src={ frontGifUrl } 
                key={ i } 
                id={ i } 
                className="pokemon"
                onClick={ handleClick }
            />
        );
    };

    useEffect(() => {
        Promise.all(playerPokemons.map(pokemonName => {
            return fetchPokemonDetails(pokemonName);
        })).then(data => {
            setPlayerPokemonData(data);
            setFightingPokemon(data[0])
            console.log(data[0]);
        });

        fetch(chosenAreasPokemonsUrl)
            .then(res => res.json())
            .then(data => {
                setWildPokemon(data.pokemon_encounters[chooseRandomPokemonIndex(data)])
            });
    }, []);

    useEffect(() => {}, [fightingPokemon]);

    return <> 
        <div className="fight-scene">
            { wildPokemon && <WildPokemon chosenWildPokemon={ wildPokemon }/> }
            { fightingPokemon && createPlayerGif(fightingPokemon) }

        </div>
        <div className="pokemon-box">
            { 
                playerPokemonData && playerPokemonData.map((pokemon, i) => {
                    return createBoxGif(pokemon, i);
                })
            }
        </div>
    </>
};