import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const AccordionContainer = styled.div`
  width: 100vw;
  max-width: 600px;
`;

export const AccordionSection = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const AccordionHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
`;

export const AccordionHeaderTitle = styled.h1`
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 16px;
  color: black;
`;
export const AccordionContent = styled.div`
  /* padding: 5px 0; */
`;
