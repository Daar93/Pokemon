import './App.css';
import { useEffect, useState } from 'react';
import FetchedAreas from './components/ComFetchedAreas';
import ShowAreasButton from './components/ComShowAreasButton';
import BattleMode from './components/ComBattleMode';

function App() {
  const [buttonPressed, setButtonPressed] = useState(null);
  const [battleMode, setBattleMode] = useState(null);
  const [chosenAreasPokemonsUrl, setChosenAreasPokemonsUrl] = useState(null);

  // useEffect(() => {}, [battleMode])

  return (
    <div className="start-button">
      { battleMode ?
          <BattleMode
            chosenAreasPokemonsUrl={ chosenAreasPokemonsUrl }
          /> :
          buttonPressed ?  
            <FetchedAreas
              setBattleMode={ setBattleMode }
              setChosenAreasPokemonsUrl={ setChosenAreasPokemonsUrl }
            /> 
          : 
          <ShowAreasButton 
            setButtonPressed={ setButtonPressed }
          />
      }
    </div>
  );
}

export default App;