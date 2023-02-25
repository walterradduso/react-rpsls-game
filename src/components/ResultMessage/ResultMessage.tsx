import { ReactElement } from 'react';

import './styles.scss';

interface ResultMessageProps {
  winner?: number | null;
}

function ResultMessage({ winner }: ResultMessageProps): ReactElement | null {
  if (!winner) {
    return null;
  }

  return (
    <div className="winner-message">
      {winner === 1 && (
        <p>
          El ganador eres <b>TU</b>!
        </p>
      )}

      {winner === 2 && (
        <p>
          El ganador es la <b>IA</b>
        </p>
      )}

      {winner === 3 && (
        <p>
          Es un <b>EMPATE</b>
        </p>
      )}
    </div>
  );
}

export default ResultMessage;
