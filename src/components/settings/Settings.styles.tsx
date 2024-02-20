'use client';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 30px;

  @media (min-width: ${bp.lg}) {
  }
`;

export const ContentContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: ${bp.lg}) {
  }
`;

export const TextContainer = styled.div`
  width: 100%;
`;

export const TextItem = styled.p`
  font-size: 20px;
  color: black;
  font-weight: 700;
`;

export const SectionContainer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  margin: 20px 0;
  padding: 30px 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  padding: 3px 0;
  color: black;
  font-size: 13px;
`;

export const Input = styled.input`
  padding: 12px;
  /* border: 1px solid gray; */
  border-radius: 5px;
  /* width: 100%; */
  border: none;
  background-color: #f5f5f5;
`;

export const CommunicationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
`;

export const CommunicationItem = styled.p`
  font-size: 16px;
  color: black;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const SaveButton = styled.button`
  padding: 8px 12px;
  background-color: ${colors.purple};
  color: ${colors.white};
`;

export const DeleteAccountButton = styled.button`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  border: none;
`;

export const DownloadDataButton = styled.button`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  border: none;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
  }
`;
