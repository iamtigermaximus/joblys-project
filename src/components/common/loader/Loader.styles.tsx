import styled, { keyframes } from 'styled-components';
import colors from '../../../utils/colors';
import { breakpoints as bp } from '../../../utils/layout';

export const flip = keyframes`
  35% {
    transform: rotateX(360deg);
  }
  100% {
    transform: rotateX(360deg);
  }
`;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loaders = styled.div`
  -webkit-perspective: 700px;
  perspective: 700px;
  display: flex;
  justify-content: center;
  margin: 100px;

  height: 100vh;
`;

export const Span = styled.span`
  font-size: 20px;
  font-family: 'Titan One', sans-serif;
  display: inline-block;
  animation: ${flip} 2.6s infinite linear;
  transform-origin: 0 70%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  color: ${colors.darkPurple};

  &:nth-child(even) {
    color: ${colors.darkPurple};
  }

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    animation-delay: 0.9s;
  }

  &:nth-child(5) {
    animation-delay: 1.2s;
  }

  &:nth-child(6) {
    animation-delay: 1.5s;
  }

  &:nth-child(7) {
    animation-delay: 1.8s;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 40px;
  }
`;

export const TextContainer = styled.div`
  position: absolute; /* Position the text relative to the Loaders container */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the text */
`;
