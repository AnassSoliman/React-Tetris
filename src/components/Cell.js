import React from 'react';
import { StyledCell } from './styles/StyledCell.js';
import { TETROMINOS } from '../tetrominos.js';

const Cell =({ type }) => (
	<StyledCell type={type} color={TETROMINOS[type].color} />
)

export default React.memo(Cell);
