// 'use client';
// import React, { useState } from 'react';
// import {
//   ActivitySection,
//   // Container,
//   HeaderContainer,
//   HeaderTextContainer,
//   HeadingSubTexts,
//   HeadingTexts,
//   // JobSearchSection,
// } from './Dashboard.styles';
// import { useSession } from 'next-auth/react';
// import JobSearch from './job-search/JobSearch';
// import RecentActivity from './recent-activity/RecentActivity';
// import styled from 'styled-components';
// import { breakpoints as bp } from '../../utils/layout';
// import { FaChevronCircleRight } from 'react-icons/fa';
// import { Resume } from '@/types/profile';

// export const Container = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   padding: 20px;
// `;

// export const ItemsContainer = styled.h1`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
// `;

// export const ResumesSectionContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   /* background-color: pink; */
//   /* border: 1px dashed red; */
//   max-width: calc(50% - 10px);
// `;
// export const CoverlettersSectionContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   /* background-color: gray; */
//   /* border: 1px dashed green; */
// `;

// export const CreateButtonContainer = styled.div`
//   display: flex;
//   height: 350px;
//   border: 1px solid gray;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// export const CardItem = styled.div`
//   display: flex;
//   height: 350px;
//   border: 1px solid gray;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// export const TitleContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   /* border: 1px solid red; */
//   width: 100%;
// `;

// export const TitleItem = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 20px;
//   font-weight: 900;
//   padding: 10px 20px;
// `;

// export const CardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* border: 1px solid orange; */
//   padding: 20px;
//   height: 450px;
//   min-width: 270px;
//   width: 100%;
//   gap: 16px;
// `;

// export const TimeStampContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* background-color: yellow; */
//   padding: 10px 0;
//   gap: 10px;
// `;

// export const Filename = styled.div`
//   font-size: 16px;
// `;

// export const Timestamp = styled.div`
//   font-size: 10px;
// `;

// interface DashboardProps {
//   resumes: {
//     id: string;
//     createdAt: string;
//     updatedAt: string;
//     resumeInfo: Resume;
//   }[];
// }

// const Dashboard: React.FC<DashboardProps> = ({ resumes }) => {
//   const { data: session } = useSession();
//   const [resumesList, setResumesList] = useState(resumes);

//   return (
//     <Container>
//       <ResumesSectionContainer>
//         <TitleContainer>
//           <TitleItem>Resume</TitleItem>
//           <TitleItem>
//             <FaChevronCircleRight />
//           </TitleItem>
//         </TitleContainer>
//         <ItemsContainer>
//           <CardContainer>
//             <CardItem>Resume</CardItem>
//             <TimeStampContainer>
//               <Filename>Filename gamboa</Filename>
//               <Timestamp>Edited 5 days ago</Timestamp>
//             </TimeStampContainer>
//           </CardContainer>

//           <CardContainer>
//             <CardItem>Resume</CardItem>
//             <TimeStampContainer>
//               <Filename>Filename gamboa</Filename>
//               <Timestamp>Edited 5 days ago</Timestamp>
//             </TimeStampContainer>
//           </CardContainer>
//         </ItemsContainer>
//       </ResumesSectionContainer>
//       <CoverlettersSectionContainer>
//         <TitleContainer>
//           <TitleItem>Coverletter</TitleItem>
//           <TitleItem>
//             <FaChevronCircleRight />
//           </TitleItem>
//         </TitleContainer>
//         <ItemsContainer>
//           <CardContainer>
//             <CardItem>Coverletter</CardItem>
//             <TimeStampContainer>
//               <Filename>Filename gamboa</Filename>
//               <Timestamp>Edited 5 days ago</Timestamp>
//             </TimeStampContainer>
//           </CardContainer>
//           <CardContainer>
//             <CardItem>Coverletter</CardItem>
//             <TimeStampContainer>
//               <Filename>Filename gamboa</Filename>
//               <Timestamp>Edited 5 days ago</Timestamp>
//             </TimeStampContainer>
//           </CardContainer>
//         </ItemsContainer>
//       </CoverlettersSectionContainer>
//     </Container>
//   );
// };

// export default Dashboard;

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import Loader from '../common/loader/Loader';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import DashboardPage from './DashboardPage';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

export const PageName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

const Dashboard = () => {
  const [profileData, setProfileData] = useState<
    | { id: string; createdAt: string; updatedAt: string; resumeInfo: Resume }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      const resumes = localStorage.getItem('cachedResumes') || '[]';
      const resumesParsed = JSON.parse(resumes);
      const data = resumesParsed.map((resume: any) => {
        return {
          id: resume.id,
          resumeInfo: resume,
        };
      });
      setProfileData(data);
      setIsLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/cv');
        const resumes = response.data.body.resumes;

        const data = resumes.map(
          (resume: {
            id: string;
            content: any;
            createdAt: string;
            updatedAt: string;
          }) => {
            return {
              id: resume.id,
              resumeInfo: resume.content,
              createdAt: resume.createdAt,
              updatedAt: resume.updatedAt,
            };
          },
        );
        setProfileData(data);
        setIsLoading(false);
        console.log('DATA', data);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  return (
    <Container>
      <DashboardPage resumes={profileData} />
    </Container>
  );
};

export default Dashboard;
