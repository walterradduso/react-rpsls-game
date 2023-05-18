import { useEffect, useState } from 'react';

import { ResultMessage } from '../ResultMessage';
import { SelectionMessage } from '../SelectionMessage';
import { Footer } from '../Footer';
import { OPTIONS } from '../../constants';

import './styles.scss';

export interface Selection {
  id: number;
  name: string;
  label: string;
  wins: number[];
}

function App() {
  const [userSelection, setUserSelection] = useState<Selection | null>();
  const [iaSelection, setIaSelection] = useState<Selection | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const checkWinner = (user: Selection, ia: Selection): number => {
    if (user?.id === ia?.id) {
      return 3;
    }

    if (user?.wins.includes(ia?.id ?? 0)) {
      return 1;
    }

    return 2;
  };

  useEffect(() => {
    if (userSelection?.id) {
      setLoading(true);
      setIaSelection(null);

      const randomSelection = Math.floor(Math.random() * OPTIONS.length);

      setTimeout(() => {
        setIaSelection(OPTIONS[randomSelection]);
        setLoading(false);

        const calculateWinner = checkWinner(userSelection, OPTIONS[randomSelection]);

        setWinner(calculateWinner);
        setDisabled(true);
      }, 1000);
    }
  }, [userSelection]);

  const reset = () => {
    setDisabled(false);
    setIaSelection(null);
    setUserSelection(null);
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>
        Piedra Papel Tijera
        <br />
        Lagarto Spock
      </h1>

      <div className="rpsls-buttons">
        {OPTIONS.map((option, index) => {
          const isSelected = userSelection?.id === option?.id;

          return (
            <button
              key={`rpsls-button-${index}`}
              className={isSelected ? 'selected' : ''}
              disabled={disabled}
              onClick={() => {
                setUserSelection(option);
                setDisabled(true);
              }}
            >
              {option?.label}
            </button>
          );
        })}
      </div>

      <SelectionMessage iaSelection={iaSelection} loading={loading} userSelection={userSelection} />

      <ResultMessage winner={winner} />

      {winner && (
        <div className="restart-game">
          <button onClick={reset}>Reiniciar</button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
