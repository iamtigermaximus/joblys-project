import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const MinimalistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;

  @media (min-width: ${bp.md}) {
    padding: 20px 100px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 20px;
    height: 100%;
  }
`;

export const MinimalistTemplate = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  padding: 30px 0;

  &.clicked {
    transform: scale(0.7);
    transition: transform 0.3s ease;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentContainerA = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  /* background-color: #fbefef; */
  background-color: #fcf9f9;
  color: black;
  padding: 0 10px;
`;

export const PersonalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    padding: 10px;
  }
`;

export const SummaryDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    padding: 10px;
  }
`;

export const Detail = styled.span`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-right: 5px;
  font-size: 10px;
  color: ${colors.blueGray};

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const BasicNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
`;

export const BasicDetail = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 7px;
  color: black;
  padding-right: 5px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const PersonalDetailsTitle = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  color: ${colors.blueGray};
  border-bottom: 0.5px solid ${colors.blueGray};

  padding-bottom: 5px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;

export const PersonalDetailsContent = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 17px;
  color: ${colors.blueGray};
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    padding: 10px 0;
  }
`;

export const ContentContainerB = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 0 10px;

  @media (min-width: ${bp.md}) {
  }
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FirstName = styled.h1`
  display: flex;
  justify-content: flex-start;
  color: ${colors.blueGray};
  font-weight: 700;
  margin-right: 10px;
  font-size: 15px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;
export const LastName = styled.h1`
  display: flex;
  justify-content: flex-start;
  color: ${colors.blueGray};
  font-weight: 700;
  font-size: 15px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;

export const JobName = styled.h1`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
  font-size: 15px;
  width: 100%;
  border-bottom: 0.2px solid gray;
  padding-bottom: 5px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  font-size: 7px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  padding-bottom: 5px;
`;

export const EducationContainerTitle = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  border-bottom: 0.2px solid gray;
  padding-bottom: 5px;
  color: ${colors.blueGray};
  font-size: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;

export const ProfessionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  padding-bottom: 5px;
`;

export const ProfessionalContainerTitle = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  border-bottom: 0.2px solid gray;
  padding-bottom: 5px;
  color: ${colors.blueGray};
  font-size: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;

export const EmploymentDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding-bottom: 10px;
  }
`;

export const EmploymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin: 10px 5px 10px 0; */
  font-size: 7px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding: 10px 0;
  }
`;

export const EmploymentDescription = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  padding-bottom: 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding-bottom: 10px;
  }
`;

export const JobTitle = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  font-weight: 700;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const CurrentRole = styled.h1`
  display: flex;
  width: 100%;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 10px;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const Company = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  color: ${colors.blueGray};
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5px 0;

  @media (min-width: ${bp.md}) {
    margin: 10px 0;
  }
`;

export const Dates = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
`;

export const Month = styled.h1`
  display: flex;
  justify-content: left;
  width: 100%;
  font-weight: 700;
  color: ${colors.blueGray};
  margin-right: 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const Year = styled.h1`
  display: flex;
  justify-content: left;
  width: 100%;
  font-weight: 700;
  color: ${colors.blueGray};
  margin-right: 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const EducationDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const Course = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  font-weight: 700;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const School = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  color: ${colors.blueGray};
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const EducationDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin: 10px 5px 10px 0; */
  font-size: 7px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding: 10px 0;
  }
`;

export const EducationDescription = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  padding-bottom: 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding-bottom: 10px;
  }
`;
export const SkillsDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.blueGray};
  padding: 5px 0;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;
export const EnteredSkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EnteredSkill = styled.div`
  display: flex;
  color: black;
  padding-right: 5px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  max-width: 114px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const LanguagesDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.blueGray};
  padding: 5px 0;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;
export const EnteredLanguagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EnteredLanguage = styled.div`
  display: flex;
  color: black;
  padding-right: 5px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  max-width: 114px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const DateSeparator = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: ${colors.blueGray};
  margin: 0 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
