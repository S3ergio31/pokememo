import { GameContext } from 'context/GameProvider';
import { useContext, useEffect, useState } from 'react';

const SECONDS_TO_GAME_OVER = 60;
const PER_SECOND = 1000;
const MAX_PROGRESS = 100;
const ONE_SECOND = 1;

const useProgress = () => {
    const [progress, setProgress] = useState(0);
    const [elapseTime, setElapseTime] = useState(0);
    const { failGame, game_over } = useContext(GameContext);

    useEffect(
        () => {
            if(progress === MAX_PROGRESS && !game_over){
                setElapseTime(0);
                failGame();
            }
        }, 
        [failGame, progress, game_over] 
    );

    useEffect(
        () => setProgress(elapseTime * MAX_PROGRESS / SECONDS_TO_GAME_OVER), 
        [elapseTime]
    );

    useEffect(() => {
        const incrementElapseTime = () => setElapseTime(actualElapseTime => actualElapseTime + ONE_SECOND);
        const timer = setInterval(incrementElapseTime, PER_SECOND);
        const stop = () => clearInterval(timer);
        if(game_over) {
            stop();
            setElapseTime(0);
        }
        return stop;
    }, [game_over]);

    return progress;
}

export default useProgress;