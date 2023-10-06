'use client';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 50px;

  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 200px;
  }
`;

export const CreateProfile = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 30px 0 30px;
  width: 100%;
  border-radius: 5px;
`;

export const CreateProfileSection = styled.div`
  /* border: 1px solid green; */
  padding: 40px;
  width: 50%;
`;

export const UploadCVSection = styled.div`
  border: 1px dashed green;
  padding: 40px;
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  height: 200px;
`;

export const BuildProfileSection = styled.div`
  border: 1px dashed green;
  padding: 40px;
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  height: 200px;
`;

export const SectionTitleContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  /* flex-direction: column;
  align-items: center; */
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  color: ${colors.purple};
`;

export const SectionSubTitle = styled.h4`
  color: black;
`;

export const FileTypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
  padding: 0 15px;
`;

export const FileType = styled.h1`
  font-size: 10px;
  font-weight: 300;
`;

export const InputContainer = styled.div`
  width: 100%;
  /* border: 1px solid #232946; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Input = styled.input`
  width: 300px;
  padding: 10px 40px;
`;

export const UploadButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
  border-radius: 5px;
  border: none;
`;

export const BuildProfileButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: ${colors.orange};
  color: ${colors.white};
  border-radius: 5px;
  border: none;
`;
