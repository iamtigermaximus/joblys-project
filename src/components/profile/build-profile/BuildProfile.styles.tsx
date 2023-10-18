'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

// export const Container = styled.div`
//   width: 100%;
//   /* border: 1px solid red; */
//   display: flex;
//   flex-direction: column;
//   padding: 50px;

//   overflow-y: scroll;

//   @media (min-width: ${bp.lg}) {
//     padding: 50px 200px;
//   }
// `;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const CreateProfile = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 30px;
  margin: 20px;

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const ChatbotSection = styled.div`
  /* border: 1px solid green; */
  margin: 40px 0;
  width: 50%;
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
`;

export const SectionTitleContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column;
  align-items: center; */
  /* justify-content: center; */
`;

export const SectionTitle = styled.h1`
  color: ${colors.purple};
  padding: 5px;
  letter-spacing: 1px;
  font-size: 20px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;

export const SaveInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const TrashIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 0;
  color: ${colors.blueGray};
`;

export const SaveButton = styled.button`
  background-color: ${colors.blueGray};
  color: ${colors.white};
  border-radius: 3px;
  padding: 5px;
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: none;
  letter-spacing: 1px;
`;

export const ContinueButton = styled.button`
  background-color: ${colors.orange};
  color: ${colors.white};
  border-radius: 3px;
  padding: 5px;
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: none;
  letter-spacing: 1px;
`;

export const Trash = styled.h4`
  letter-spacing: 1px;
  padding: 0 3px;
`;
