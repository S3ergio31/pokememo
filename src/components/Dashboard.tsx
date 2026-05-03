import { useContext } from 'react';
import Pokemon from 'components/Pokemon';
import { GameContext } from 'context/GameProvider';

function Dashboard() {
  return (
    <div className="cards-grid">
      {useContext(GameContext).pokemons.map(card => (
        <Pokemon key={card.key} pokemon={card.value} />
      ))}
    </div>
  );
}

export default Dashboard;
