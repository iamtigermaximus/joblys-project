'use client';
import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const DefaultTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  gap: 20px;
`;

export const Template = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  height: 800px;

  @media print {
    .page-break {
      page-break-before: always;
    }
  }

  &.clicked {
    transform: scale(0.7);
    transition: transform 0.3s ease;
  }
`;
export const BasicContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #232946;
  width: 35%;
  padding: 50px 20px;
  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffffe;
  width: 65%;
  padding: 50px 20px;

  @media print {
    .page-break {
      page-break-before: always;
    }
  }
`;

export const BasicsTitleContainer = styled.div`
  display: flex;
  padding-bottom: 5px;
`;

export const BasicsTitle = styled.h1`
  color: white;
  font-size: 15px;
`;

export const BasicsNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const BasicsItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
export const BasicsItem = styled.h1`
  color: white;
  font-size: 12px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  padding: 5px 0;
`;

export const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  font-size: 17px;
`;

export const HeaderName = styled.h1`
  color: #232946;
  font-size: 30px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  padding: 3px 0;
`;

export const HeaderCurrentRole = styled.h1`
  color: #232946;
  font-size: 15px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
`;
export const DetailsTitleContainer = styled.div`
  display: flex;
  padding: 5px 0;
`;
export const DetailsTitle = styled.h1`
  color: #232946;
  font-size: 15px;
  border-bottom: 0.5px solid #232946;
`;

export const SummaryContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Summary = styled.h1`
  color: #232946;
  font-size: 12px;
  max-width: 100%;
  word-break: break-all;
  white-space: wrap;
  padding: 5px 0;
`;

export const DetailsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  padding: 5px 0;
`;

export const EmploymentDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EmploymentDetail = styled.div``;
export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const Dates = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const Month = styled.div``;
export const Year = styled.div``;
export const DateSeparator = styled.div`
  font-size: 14px;
  padding: 0 5px;
`;
export const JobTitle = styled.div`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 13px;
`;
export const Company = styled.div`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 13px;
`;
export const Description = styled.div`
  padding: 5px 0;
`;

export const EducationDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Course = styled.div`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 13px;
`;

export const School = styled.div`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  font-size: 13px;
`;

export const EducationDetail = styled.div``;
