import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
  /* padding: 20px 30px; */

  @media (min-width: ${bp.lg}) {
    /* padding: 50px 100px; */
  }
`;

export const SkillsDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  /* border-radius: 8px; */
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); */
  width: 100%;
  padding: 30px 20px;
  /* margin: 20px; */
  /* color: ${colors.white}; */
  color: black;

  /* @media (min-width: ${bp.sm}) {
    max-width: 400px;
    padding: 30px 40px;
  } */

  @media (min-width: ${bp.md}) {
    /* max-width: 500px; */
    /* width: 100%; */
  }
`;
