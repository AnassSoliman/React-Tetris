import styled from 'styled-components';

export const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height},
		calc(25vw / ${props => props.width})
	);
	grid-template-collumns: repeat(${props => props.width, })
`
