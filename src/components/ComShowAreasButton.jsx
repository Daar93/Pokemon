import { useEffect, useState } from "react";

export default function ShowAreas({ setButtonPressed }) {
    
    function handleClick(event) {
        event.preventDefault();
        setButtonPressed(true);
    };

    return <button onClick={ handleClick }>Show Areas</button>
};