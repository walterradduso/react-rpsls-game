import { ReactElement, useEffect, useState } from 'react';

import { OPTIONS } from '../../constants';

import './App.scss';

interface Selection {
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
      }, 1500);
    }
  }, [userSelection]);

  const reset = () => {
    setDisabled(false);
    setIaSelection(null);
    setUserSelection(null);
    setWinner(null);
  };

  const renderWinnerMessage = (): ReactElement => {
    if (winner === 1) {
      return (
        <p>
          El ganador eres <b>TU</b>!
        </p>
      );
    }

    if (winner === 2) {
      return (
        <p>
          El ganador es la <b>IA</b>
        </p>
      );
    }

    return (
      <p>
        Es un <b>EMPATE</b>
      </p>
    );
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
              }}
            >
              {option?.label}
            </button>
          );
        })}
      </div>

      {userSelection?.id && (
        <div className="rpsls-selection">
          {userSelection?.id && <p>Seleccionaste {userSelection?.label}</p>}

          {iaSelection?.id && <p>La IA seleccionó {iaSelection?.label}</p>}

          {loading && (
            <div className="loading">
              <p>La IA está seleccionado una opción</p>
              <img alt="Spinner" src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" />
            </div>
          )}
        </div>
      )}

      {winner && <div className="winner-message">{renderWinnerMessage()}</div>}

      {winner && (
        <div className="restart-game">
          <button onClick={reset}>Reiniciar</button>
        </div>
      )}
    </div>
  );
}

export default App;
