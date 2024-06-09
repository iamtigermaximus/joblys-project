import { breakpoints as bp } from '@/utils/layout';
import styled from 'styled-components';

export const EducationFieldContainer = styled.div`
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

export const EducationItem = styled.div`
  margin-bottom: 10px;
  width: 100%;
  gap: 10px;
`;

export const QuestionContainer = styled.div`
  padding: 20px 10px;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
`;
export const TextInputContainer = styled.div`
  width: 100%;
  padding: 5px;
  margin-bottom: 20px;
`;

export const DateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const AdditionalTextInputContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  /* margin-bottom: 5px; */
  border: none;
  background-color: #f5f5f5;
  outline: none;
  border-bottom: 0.5px solid gray;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

export const AddEducationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const AddEducation = styled.button`
  padding: 10px;
`;

export const EducationItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-size: 10px;
  font-size: 14px;
  padding: 10px;
  color: gray;
`;

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const MonthSelect = styled.select`
  width: 50%;
  background-color: #f5f5f5;
  height: 40px;
  padding: 8px;
  border: none;
  margin-right: 5px;
  font-size: 14px;
  color: gray;
`;

export const YearSelect = styled.select`
  width: 50%;
  background-color: #f5f5f5;
  height: 40px;
  padding: 8px;
  border: none;
  font-size: 14px;
  color: gray;
`;
