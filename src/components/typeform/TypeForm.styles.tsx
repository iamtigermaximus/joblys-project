import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';

export const FormContainer = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* border: 1px solid white; */
  /* height: 100%; */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.1);
`;

export const FieldContainer = styled.div`
  /* height: 400px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 400px; */
  /* border: 1px solid red; */
`;

export const ButtonGroup = styled.div`
  display: flex;
  padding: 10px;
`;

export const Button = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 8px;
  cursor: pointer;
  background-color: #520668;

  &:hover {
    background-color: #3e0450;
  }
`;
