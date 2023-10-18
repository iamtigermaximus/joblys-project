'use client';

import { breakpoints as bp } from '../../../../utils/layout';
import colors from '../../../../utils/colors';
import styled from 'styled-components';

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

export const CreateProfileSection = styled.div`
  padding: 10px;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    padding: 40px;
  }
`;

export const ProfileBuildSection = styled.div`
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
    justify-content: inherit;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const BuildProfileButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: ${colors.orange};
  color: ${colors.white};
  border-radius: 5px;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
