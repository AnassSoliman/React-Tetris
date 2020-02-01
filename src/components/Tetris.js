import React, { useState, useCallback } from 'react';

import { createStage, checkCollision } from '../gameHelpers.js';

// Styled Components
import { StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer.js';
import { useStage } from '../hooks/useStage.js';
import { useInterval } from '../hooks/useInterval.js';

// components
import Stage from './Stage.js';
import Display from './Display.js';
import StartButton from './StartButton.js';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	console.log('re-render');

	const movePlayer = dir => {
		if(!checkCollision(player, stage, {x: dir, y: 0})){
			updatePlayerPos({x: dir, y: 0});
		}
	}

	const startGame =() => {
		// Reset everything
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setGameOver(false);
	}

	const drop = () => {
		if(!checkCollision(player, stage, {x: 0, y: 1})){
			updatePlayerPos({x: 0, y: 1, collided: false})
		} else {
			// Game Over
			if(player.pos.y < 1) {
				console.log("GAME OVER!")
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x: 0, y: 0, collided: true})
		}
	}

	const keyUp = (event) => {
		if(!gameOver) {
			if(event.key === "s") {
				console.log("interval on");
				setDropTime(1000);
			}
		}
	}

	const dropPlayer = () => {
		console.log("interval off");
		setDropTime(null);
		drop();	
	}

	const move = (event) => {
		if(!gameOver) {
			if(event.key === "a") {
				movePlayer(-1);
			} else if(event.key === "d") {
				movePlayer(1);
			} else if(event.key === "s") {
				dropPlayer();
			} else if(event.key === "e") {
				playerRotate(stage, 1);
			} else if(event.key === "q") {
				playerRotate(stage, -1)
			}
		}	
	}

	useInterval(() => {
		drop();

	}, dropTime)

	return(
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}onKeyUp={e => keyUp(e)}>
			<StyledTetris>
			<Stage stage={stage} />	
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<div>
							<Display text="Score" />
							<Display text="Rows" />
							<Display text="Level" />
						</div>
					)}
					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	)
}

export default Tetris;
