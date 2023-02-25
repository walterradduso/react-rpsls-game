import type { Selection } from '../App';

import { ReactElement } from 'react';
import './styles.scss';

interface SelectionMessageProps {
  iaSelection?: Selection | null;
  loading: boolean;
  userSelection?: Selection | null;
}

function SelectionMessage({
  iaSelection,
  loading,
  userSelection,
}: SelectionMessageProps): ReactElement | null {
  if (!userSelection?.id) {
    return null;
  }

  return (
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
  );
}

export default SelectionMessage;
