import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;

  @media (min-width: ${bp.md}) {
    width: 400px;
  }
`;

export const QuestionContainer = styled.div`
  padding: 20px 10px;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
`;

export const TextInputContainer = styled.div`
  width: 100%;
`;
export const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  /* margin-bottom: 5px; */
  border: none;
  background: linear-gradient(145deg, #f8f7ff, #eae8ff);
  outline: none;
  border-bottom: 0.5px solid gray;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

export const Question = styled.h4`
  color: #2e033b;
`;
