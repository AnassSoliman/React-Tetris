import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton.js';

const StartButton = ({ callback }) => (
	<StyledStartButton onClick={callback} >Start Game</StyledStartButton>
)

export default StartButton;
