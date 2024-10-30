'use client';

import colors from '@/utils/colors';
import { breakpoints as bp } from '../../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #ffffff, #f8f7ff, #eae8ff);

  flex-direction: column;

  @media (-width: ${bp.md}) {
    height: 100vh;
  }
  @media (min-width: ${bp.lg}) {
    height: 100vh;
  }
`;

// export const ProfileBuilderContainer = styled.div`
//   display: flex;
//   width: 100%;
//   background-color: white;
//   flex-direction: column;
//   height: 100vh;
//   /* position: fixed; */
// `;

export const ResumeBuilderContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  flex-direction: column;
  height: 100vh;
`;

export const CoverletterBuilderContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  flex-direction: column;
  height: 100vh;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
  }
  @media (min-width: ${bp.lg}) {
    height: 100%;
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
  background: linear-gradient(145deg, #f8f7ff, #eae8ff);
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
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #2e033b;
  font-weight: 700;
  font-family: 'Honk', system-ui;
  white-space: nowrap;
  font-family: SuisseIntl, sans-serif;
  line-height: 24px;

  @media (min-width: ${bp.lg}) {
    font-size: 30px;
    padding: 20px 0;
  }
`;

export const BoxBody = styled.div`
  width: 100%;
  /* padding: 0 20px; */
  display: flex;
  align-items: center;
`;

export const GetStartedButton = styled.button`
  margin: 0 2px;
  padding: 10px 20px;
  white-space: nowrap;
  border-radius: 5px;
  border: none;
  background-color: ${colors.purple};
  color: ${colors.offWhite};
  cursor: pointer;
  /* moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out; */

  transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(69, 26, 128, 0.9),
      rgba(75, 30, 138, 0.9),
      rgba(106, 13, 173, 0.9)
    );
    border: none;
    color: ${colors.white};
  }

  @media (min-width: ${bp.lg}) {
    width: 150px;
    letter-spacing: 1px;
  }
`;

export const ResumeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow-y: auto;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    width: 100%;
    /* height: 100vh; */
  }
`;

export const ResumeTemplateContainer = styled.div`
  display: none;

  @media (min-width: ${bp.lg}) {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #ffffff, #f8f7ff, #eae8ff);
    overflow-y: auto;
    padding: 50px 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CoverletterContentContainer = styled.div`
  /* display: none; */

  @media (min-width: ${bp.lg}) {
    min-height: 500px;
    height: 100vh;
    background-color: white;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export const FormViewerContainer = styled.div`
  display: flex;
  background: linear-gradient(145deg, #ffffff, #f8f7ff, #eae8ff);

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 400px;
  padding: 10px;

  @media (min-width: ${bp.sm}) {
    width: 450px;
    height: 550px;
  }

  @media (min-width: ${bp.md}) {
    width: 350px;
    height: 400px;
  }
`;

export const ValueProposition = styled.p`
  font-size: 14px;
  color: #2e033b;
  font-family: SuisseIntl, sans-serif;
  line-height: 24px;

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
  }
`;
