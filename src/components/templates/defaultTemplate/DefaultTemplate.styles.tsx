'use client';
import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import { Page, Text, View, Document } from '@react-pdf/renderer';

export const DefaultTemplateContainer = styled(Document)`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%; */
  /* border: 3px solid red; */
  display: flex;
  flex-direction: column;
`;

export const Template = styled(Page)`
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* display: flex;
  flex-direction: row;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  height: 100%; */

  /* &.clicked {
    transform: scale(0.7);
    transition: transform 0.3s ease;
  }

  @media (min-width: ${bp.sm}) {
    min-height: 600px;
    transform: scale(0.8);
  }

  @media (min-width: ${bp.md}) {
    min-width: 600px;
    min-height: 800px;
    transform: scale(0.7);
  }

  @media (min-width: ${bp.lg}) {
    min-height: 800px;
    transform: scale(0.9);
    height: 100vh;
  }

  @media (min-width: ${bp.xl}) {
    min-width: 600px;
    min-height: 800px;
  } */
`;
export const BasicContentContainer = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #232946;
  width: 35%;
  padding: 20px 10px;
  color: white;
  min-width: 100px;
  height: 100vh;

  @media (min-width: ${bp.lg}) {
    padding: 50px 20px;
    min-height: 800px;
    height: 100%;
  }
`;

export const Content = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: green;
`;

export const ContentContainer = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #fffffe;
  width: 65%;
  padding: 20px 10px;
  min-width: 250px;
  height: 100%;

  @media (min-width: ${bp.lg}) {
    padding: 50px 20px;
    min-height: 800px;
    height: 100%;
  }
`;

export const BasicsTitleContainer = styled(View)`
  display: flex;
  padding: 5px 0;
  border-bottom: 0.5px solid white;
  border-top: 0.5px solid white;
`;

export const BasicsTitle = styled(Text)`
  color: white;
  font-size: 10px;
  white-space: nowrap;
  letter-spacing: 1px;

  @media (min-width: ${bp.lg}) {
    font-size: 15px;
  }
`;

export const BasicsNameContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 5px;

  @media (min-width: ${bp.lg}) {
    gap: 10px;
  }
`;

export const BasicsItemsContainer = styled(View)`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const BasicsItem = styled(Text)`
  color: white;
  font-size: 8px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  padding: 2px 0;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 12px;
  }
`;

export const IconContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 17px;
  }
`;

export const HeaderName = styled(Text)`
  color: #232946;
  font-size: 15px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;

  @media (min-width: ${bp.sm}) {
    font-size: 25px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 30px;
    padding: 3px 0;
  }
`;

export const HeaderCurrentRole = styled(Text)`
  color: #232946;
  font-size: 12px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;

  @media (min-width: ${bp.sm}) {
    font-size: 17px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 15px;
  }
`;
export const DetailsTitleContainer = styled(View)`
  display: flex;
  padding: 5px 0;
`;

export const DetailsTitle = styled(Text)`
  color: #232946;
  font-size: 10px;
  border-bottom: 0.5px solid #232946;

  @media (min-width: ${bp.sm}) {
    font-size: 13px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 15px;
  }
`;

export const SummaryContainer = styled(View)`
  display: flex;
  width: 100%;
`;

export const Summary = styled(Text)`
  color: #232946;
  font-size: 8px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  padding: 5px 0;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 12px;
  }
`;

export const DetailsContentContainer = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 8px;
  padding: 5px 0;

  @media (min-width: ${bp.lg}) {
    font-size: 12px;
  }
`;

export const EmploymentDetailsContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EmploymentDetail = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 2;
`;
export const DateContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const Dates = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const Month = styled(View)`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const Year = styled(View)`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const DateSeparator = styled(View)`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const JobTitle = styled(View)`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const Company = styled(View)`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const Description = styled(View)`
  padding: 5px 0;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const EducationDetailContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Course = styled(View)`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const School = styled(View)`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const EducationDetail = styled(View)`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
