import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';

import { TETROMINOS, randomTetromino } from '../tetrominos.js';

export const usePlayer = () => {
	//With ES6 structuring, line below is short for:
	//const playerState = useState();
	//const player = playerState[0];
	//const setPlayer = playerState[1];

	const [player, setPlayer] = useState({
		pos: {x: 0, y: 0},
		tetromino: TETROMINOS[0].shape,
		collided: false,
	});

	const updatePlayerPos = ({x, y, collided}) => {
		setPlayer(prev => ({
			...prev,
			pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
			collided,
		}))
	}

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
			tetromino: randomTetromino().shape,
			collided: false,
		})
	}, [])
	
	return[player, updatePlayerPos, resetPlayer];
}
