import styled, { keyframes } from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    padding: 20px 0;
  }
`;

export const ProfessionalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  color: ${colors.white};
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    gap: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 6px;
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  font-size: 14px;
  height: 100px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  margin-bottom: 10px;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    border: none;
    margin-bottom: 20px;
  }
`;

export const InputLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;

  @media (min-width: ${bp.md}) {
    margin: 5px 0;
  }
`;

export const CheckboxInput = styled.input`
  appearance: none;
  background-color: transparent;
  border: 1px solid #000;
  width: 14px;
  height: 14px;
  cursor: pointer;

  &:checked {
    background-color: transparent;
  }

  &:checked::after {
    content: '';
    display: block;
    width: 5px;
    height: 10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: relative;
    left: 2px;
    bottom: 1px;
  }
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: none;
  color: black;

  &:focus {
    outline: 0.5px solid gray;
  }
`;

export const WorkExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const AddWorkExperienceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;

  @media (min-width: ${bp.md}) {
    /* justify-content: flex-start; */
  }
`;

export const AddWorkExperienceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  font-size: 14px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(69, 26, 128, 0.9),
      rgba(75, 30, 138, 0.9),
      rgba(106, 13, 173, 0.9)
    );
    color: ${colors.white};
  }

  @media (min-width: ${bp.md}) {
    width: 40%;
  }
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
  padding: 8px 12px;
  border: none;
  margin-right: 5px;
  font-size: 14px;
`;

export const YearSelect = styled.select`
  width: 50%;
  background-color: #f5f5f5;
  height: 40px;
  padding: 8px 12px;
  border: none;
  font-size: 14px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 5px;
  padding: 0 6px;
`;

export const TrashIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${colors.blueGray};
  background-color: ${colors.white};
  color: ${colors.blueGray};
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;
  white-space: nowrap;
  max-width: 200px;
  min-width: 80px;

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(69, 26, 128, 0.9),
      rgba(75, 30, 138, 0.9),
      rgba(106, 13, 173, 0.9)
    );
    color: ${colors.white};
  }
`;

export const EnhanceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;
  white-space: nowrap;
  max-width: 200px;
  min-width: 80px;
  border: none;

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(69, 26, 128, 0.9),
      rgba(75, 30, 138, 0.9),
      rgba(106, 13, 173, 0.9)
    );
    color: ${colors.white};
  }

  @media (min-width: ${bp.md}) {
  }
`;

export const SuccessAlert = styled.p`
  color: #28a745;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  padding: 5px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;

  position: absolute;
  top: 10px;
  left: 40%;
  transform: translateX(-40%);
`;
