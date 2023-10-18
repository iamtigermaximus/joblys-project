'use client';

import { breakpoints as bp } from '../../../../utils/layout';
import colors from '../../../../utils/colors';
import styled from 'styled-components';

export const CreateProfileSection = styled.div`
  padding: 10px;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    /* padding: 40px; */
  }
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  color: ${colors.purple};
`;

export const SectionSubTitle = styled.h4`
  color: black;
`;

export const UploadCVSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${colors.blueGray};
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  height: 200px;

  @media (min-width: ${bp.lg}) {
    padding: 40px;
    margin: 20px 0;
  }
`;

export const FileTypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  /* margin: 10px 0; */
  /* padding: 0 15px; */
`;

export const FileType = styled.h1`
  font-size: 10px;
  font-weight: 300;
`;

export const InputContainer = styled.div`
  width: 100%;
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

  &:hover {
    cursor: pointer;
  }
`;
