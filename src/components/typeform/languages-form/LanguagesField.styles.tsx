import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';

export const LanguagesFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;

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
  margin-top: 10px;
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

export const AddMoreLanguageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const AddMoreLanguage = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 1px solid #2e033b;
`;

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
`;

export const TextInputItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Question = styled.h4`
  color: #2e033b;
`;
