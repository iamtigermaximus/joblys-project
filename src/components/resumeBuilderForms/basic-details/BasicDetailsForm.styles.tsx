import styled from 'styled-components';
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

export const BasicDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: ${colors.white};
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    gap: 20px; /* Adjust the gap between input fields as needed */
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: none;
  color: black;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px 12px;
  width: 100%;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    background-color: #f5f5f5;
    border: none;
    color: black;
    height: 40px;
    margin-bottom: 10px;
    padding: 8px 12px;
    width: 100%;

    &:focus {
      outline: 0.5px solid gray;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    margin: 5px 0;
  }
`;

export const AddMoreLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;

  @media (min-width: ${bp.md}) {
    /* justify-content: flex-start; */
  }
`;

export const AddMoreLinksButton = styled.button`
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
    width: 30%;
  }
`;

export const AddNewLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
`;

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: white;
  border: none;
`;

export const NewLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
