import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AccordionContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const AccordionSection = styled.div`
  margin-bottom: 10px;
`;

export const AccordionHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: aliceblue;
`;

export const AccordionContent = styled.div`
  padding: 10px;
`;
