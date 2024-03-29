'use client';
import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';

export const DefaultTemplateContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%; */
  /* border: 3px solid red; */
  @media (min-width: ${bp.lg}) {
    min-height: 800px;
    height: 100vh;
  }
`;

export const Template = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  /* border: 3px solid green; */
  transform-origin: top;
  transform: scale(0.85);
  height: 100vh;

  &.clicked {
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
  }
`;
export const BasicContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #232946;
  width: 35%;
  padding: 20px 10px;
  color: white;
  min-width: 100px;
  height: 100%;

  @media (min-width: ${bp.lg}) {
    padding: 50px 20px;
    min-height: 800px;
    height: 100%;
  }
`;

export const ContentContainer = styled.div`
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

export const BasicsTitleContainer = styled.div`
  display: flex;
  padding: 5px 0;
  border-bottom: 0.5px solid white;
  border-top: 0.5px solid white;
`;

export const BasicsTitle = styled.h1`
  color: white;
  font-size: 10px;
  white-space: nowrap;
  letter-spacing: 1px;

  @media (min-width: ${bp.lg}) {
    font-size: 15px;
  }
`;

export const BasicsNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  @media (min-width: ${bp.lg}) {
    gap: 10px;
  }
`;

export const BasicsItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const BasicsItem = styled.h1`
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

export const IconContainer = styled.span`
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

export const HeaderName = styled.h1`
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

export const HeaderCurrentRole = styled.h1`
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
export const DetailsTitleContainer = styled.div`
  display: flex;
  padding: 5px 0;
`;

export const DetailsTitle = styled.h1`
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

export const SummaryContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Summary = styled.h1`
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

export const DetailsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 8px;
  padding: 5px 0;

  @media (min-width: ${bp.lg}) {
    font-size: 12px;
  }
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
export const Month = styled.div`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const Year = styled.div`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const DateSeparator = styled.div`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const JobTitle = styled.div`
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
export const Company = styled.div`
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
export const Description = styled.div`
  padding: 5px 0;
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
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
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const School = styled.div`
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

export const EducationDetail = styled.div`
  font-size: 8px;

  @media (min-width: ${bp.sm}) {
    font-size: 10px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
