'use client';

import colors from '@/utils/colors';
import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #b4ecf9;
  flex-direction: column;
`;

export const ProfileBuilderContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  flex-direction: column;
  height: 100vh;
  position: fixed;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export const Box = styled.div`
  width: 100%;
  order: 2;

  @media (min-width: ${bp.md}) {
    width: 50%;
    height: 100%;
    position: relative;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    order: 1;
  }
`;

export const Box3 = styled.div`
  width: 100%;
  background-color: aliceblue;
  padding: 20px;
  border-radius: 10px;

  @media (min-width: ${bp.lg}) {
    position: relative;
    padding: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

export const Box2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/blobanimation.svg');
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  order: 1;
  margin-bottom: 20px;

  @media (min-width: ${bp.md}) {
    width: 50%;
    height: 100%;
    padding: 20px;
    flex-direction: column;
    order: 2;
  }
`;

export const BoxHeader = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 30px;
  color: ${colors.purple};
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    font-size: 60px;
  }
`;

export const BoxBody = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

export const GetStartedButton = styled.button`
  margin: 0 2px;
  padding: 10px 20px;
  white-space: nowrap;
  background-color: #232946;
  border-radius: 10px;
  border: none;
  color: white;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    letter-spacing: 1px;
  }
`;

export const ResumeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    width: 100%;
  }
`;

export const ResumeTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f8f8;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    width: 100%;
  }
`;

export const FormViewerContainer = styled.div`
  display: flex;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;
