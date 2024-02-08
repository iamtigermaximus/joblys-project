import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const TemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100vw;
  padding: 0 20px;

  @media (min-width: ${bp.md}) {
    padding: 20px 100px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 20px;
  }
`;

export const Template = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  color: ${colors.blueGray};
  border-left: 20px solid#bb342f;
  height: 500px;

  @media (min-width: ${bp.sm}) {
    height: 600px;
  }

  @media (min-width: ${bp.md}) {
    height: 100vh;
    width: 600px;
  }

  @media (min-width: ${bp.lg}) {
    height: 100vh;
    width: 100%;

    &.clicked {
      transform: scale(0.7);
      transition: transform 0.3s ease;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const ContentContainerA = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  background-color: #fbefef;
  color: black;
  padding: 10px 5px;
  height: 100%;

  @media (min-width: ${bp.md}) {
    padding: 20px 10px;
  }

  @media (min-width: ${bp.lg}) {
    height: 100vh;
  }
`;
export const PersonalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    padding: 10px 0;
  }
`;

export const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  font-size: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;

export const BasicNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BasicDetail = styled.div`
  display: flex;
  align-items: center;
  font-size: 7px;
  color: black;
  padding-right: 5px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  max-width: 114px;

  @media (min-width: ${bp.md}) {
    font-size: 10px;
  }
`;

export const PersonalDetailsTitle = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  color: #bb342f;
  border-bottom: 0.5px solid #bb342f;
  padding-bottom: 5px;

  @media (min-width: ${bp.md}) {
    font-size: 17px;
  }
`;

export const PersonalDetailsContent = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 17px;
  color: #bb342f;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    padding: 10px 0;
  }
`;

export const ContentContainerB = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 5px;

  @media (min-width: ${bp.md}) {
    padding: 10px 20px;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 0 0;
  color: #bb342f;
  font-weight: 700;
`;

export const FirstName = styled.h1`
  display: flex;
  justify-content: flex-start;
  color: #bb342f;
  font-weight: 700;
  margin-right: 3px;
  font-size: 15px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;
export const LastName = styled.h1`
  display: flex;
  justify-content: flex-start;
  color: #bb342f;
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
  padding-bottom: 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    padding-bottom: 10px;
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
  color: #bb342f;
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
  color: #bb342f;
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
  justify-content: left;
  align-items: center;
  width: 100%;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

export const Company = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  color: #bb342f;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin: 5px 0;

  @media (min-width: ${bp.md}) {
    margin: 10px 0;
  }
`;

export const Dates = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Month = styled.h1`
  display: flex;
  justify-content: left;
  width: 100%;
  font-weight: 700;
  color: #bb342f;
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
  color: #bb342f;
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
  color: #bb342f;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const EducationDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  color: #bb342f;
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
  color: #bb342f;
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
  color: #bb342f;
  margin: 0 5px;
  font-size: 7px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;
