import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const TemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;

  @media (min-width: ${bp.lg}) {
    /* padding: 50px 20px; */
    height: 100vh;
  }
`;

export const Template = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 600px;
  padding: 30px 20px;
  margin: 20px;
  color: ${colors.blueGray};
`;
