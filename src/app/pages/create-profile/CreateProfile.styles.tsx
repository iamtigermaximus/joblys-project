'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import Link from 'next/link';

export const Container = styled.div`
  width: 80vw;
  height: 100vh;
  float: left;

  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  background-color: #b8c1ec;
`;

export const CreateProfileContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px;
  border-radius: 20px;

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const Box = styled.div`
  /* background: pink; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  border: 1px dashed #232946;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
`;

export const FileTypeContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 0 15px;
`;

export const FileType = styled.h1`
  font-size: 10px;
  font-weight: 300;
`;

export const CreateProfileTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #232946;
`;

export const CreateProfileTitle = styled.h1`
  text-shadow: 0.6px 0 0;
  font-size: 20px;
  color: #232946;
  letter-spacing: 1px;
`;

export const CreateAccountContainer = styled.div`
  width: 300px;
`;

export const CreateAccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border: 1px solid #232946;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
  background: #232946;
  color: #b8c1ec;

  &:hover {
    background: #b8c1ec;
    border: 1px solid #b8c1ec;
    color: #232946;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  border: 1px solid #232946;
  display: flex;
  align-items: center;
`;

export const InputLabel = styled.label`
  border: 1px solid red;
  padding: 10px;
`;

export const Input = styled.input`
  width: 300px;
  padding: 10px 40px;
`;

export const InputText = styled.span`
  font-style: italic;
  font-size: 14px;
  color: #888;
`;

export const Subtexts = styled.h1`
  font-size: 13px;
  font-weight: 400;
  padding: 10px;
`;

export const BuildYourProfileContainer = styled(Link)`
  text-decoration: none;
`;

export const BuildYourProfileButton = styled.button`
  width: 200px;
  padding: 10px;
  border: 1px solid #232946;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
  background: #232946;
  color: #b8c1ec;

  &:hover {
    background: #b8c1ec;
    border: 1px solid #b8c1ec;
    color: #232946;
  }
`;
