import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: ${bp.lg}) {
    width: 50%;
    padding: 40px;
  }
`;

export const HeadingTexts = styled.h1`
  color: ${colors.purple};
  margin: 5px 0;
`;

export const HeadingSubTexts = styled.p`
  line-height: 1.5;
  letter-spacing: 1px;
  text-align: justify;
  margin: 5px 0;
`;

export const ActivitySection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 30px 0 30px;
`;
