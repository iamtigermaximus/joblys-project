'use client';

//import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  /* border: 1px solid red; */
  padding: 30px 100px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background-color: #f8f8f8;
`;

export const ProfileSection = styled.div`
  display: flex;
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px white;
`;

export const ContactInformation = styled.div`
  /* border: 1px solid green; */
  width: 50%;
  margin: 0 5px 0 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const LocationInformation = styled.div`
  /* border: 1px solid green; */
  width: 50%;
  margin: 0 0 0 5px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const ResumeDocumentSection = styled.div`
  display: flex;
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const SummarySection = styled.div`
  display: flex;
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  height: 150px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const LinkContainer = styled.div`
  display: flex;
  /* border: 1px solid red; */
  width: 100%;
  height: 60px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const SkillsSection = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
`;

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
  padding: 10px;
`;

export const EducationSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 0 10px white;
  padding: 10px;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
  width: 100%;
`;

export const SectionHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
`;

export const SectionHeadingText = styled.h1`
  font-size: 13px;
  color: #232946;
`;

export const SectionHeadingIcon = styled.span`
  font-size: 16px;
  color: #232946;
  margin: 0 5px;
`;

export const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px;
  margin: 10px 0;
  font-size: 13px;
  color: #232946;
`;

export const UploadedResumeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 5px;
  background-color: #e8e8e8;
  width: 100%;
`;

export const LastUpdated = styled.h1`
  padding: 5px;
  color: gray;
  font-size: 8px;
`;

export const SummarySectionText = styled.p`
  font-size: 13px;
  color: #232946;
  margin-right: 100px;
  font-weight: 500;
`;

export const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  flex-wrap: wrap;
`;

export const SkillContainer = styled.div`
  background-color: #e8e8e8;
  width: 100px;
  font-size: 13px;
  padding: 5px 10px;
  margin: 5px 10px;
  border-radius: 5px;
`;

export const AddLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e8e8e8;
  padding: 5px;
`;

export const Label = styled.h1`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const WorkSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
  width: 100%;
  background-color: #e8e8e8;
  margin: 10px 0;
`;
