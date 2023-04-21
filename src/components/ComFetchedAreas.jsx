import { useEffect, useState } from "react";

export default function FetchedAreas({ setBattleMode, setChosenAreasPokemonsUrl }) {
    const [fetchedAreas, setFetchedAreas] = useState(null);
    const areasUrl = "https://pokeapi.co/api/v2/location-area/"

    async function fetchLocations() {
        const locationsRaw = await fetch(areasUrl);
        const locationsJS = await locationsRaw.json();

        setFetchedAreas(locationsJS);
    };

    function handleClick(event) {
        event.preventDefault();
        setBattleMode(true);
        setChosenAreasPokemonsUrl(areasUrl + event.target.id);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div className="areas">
            { 
                fetchedAreas && fetchedAreas.results.map((area, i) => {
                    return ( 
                        <button 
                            className="area" key={ i } id={i + 1} 
                            onClick={ handleClick }
                        >
                            { area.name }
                        </button>
                    )
                })
            }
        </div>
    );
};