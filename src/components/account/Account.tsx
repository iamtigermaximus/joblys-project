// 'use client';
// import React from 'react';
// import {
//   AddButton,
//   AddLabelContainer,
//   ContactInformation,
//   Container,
//   EducationSection,
//   ExperienceSection,
//   Label,
//   LastUpdated,
//   LinkContainer,
//   LinksSection,
//   LocationInformation,
//   ProfileContainer,
//   ProfileSection,
//   ResumeDocumentSection,
//   SectionBody,
//   SectionContent,
//   SectionHeading,
//   SectionHeadingIcon,
//   SectionHeadingText,
//   SkillContainer,
//   SkillsSection,
//   SkillsWrapper,
//   SummarySection,
//   SummarySectionText,
//   UploadedResumeContainer,
//   WorkSectionContent,
// } from './Account.styles';
// import {
//   HiPencil,
//   HiTrash,
//   HiDocumentArrowDown,
//   HiCalendarDays,
// } from 'react-icons/hi2';

// const Account = () => {
//   return (
//     <Container>
//       <ProfileContainer>
//         <ProfileSection>
//           <ContactInformation>
//             <SectionContent>
//               <SectionHeading>
//                 <SectionHeadingText>Contact Information</SectionHeadingText>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//               </SectionHeading>
//               <SectionBody>
//                 <h4>Siegfred Gamboa</h4>
//                 <h4>siegy.gamboa@example.com</h4>
//                 <h4>+358902544642</h4>
//               </SectionBody>
//             </SectionContent>
//           </ContactInformation>
//           <LocationInformation>
//             <SectionContent>
//               <SectionHeading>
//                 <SectionHeadingText>Location Information</SectionHeadingText>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//               </SectionHeading>
//               <SectionBody>
//                 <h4>Helsinki, 00100</h4>
//                 <h4>Finland</h4>
//               </SectionBody>
//             </SectionContent>
//           </LocationInformation>
//         </ProfileSection>
//         <ResumeDocumentSection>
//           <SectionContent>
//             <SectionHeading>
//               <SectionHeadingText>My Resume Document</SectionHeadingText>
//               <div>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//                 <SectionHeadingIcon>
//                   <HiTrash />
//                 </SectionHeadingIcon>
//               </div>
//             </SectionHeading>
//             <SectionBody>
//               <UploadedResumeContainer>
//                 <h4>SMG-CV.pdf</h4>
//                 <SectionHeadingIcon>
//                   <HiDocumentArrowDown />
//                 </SectionHeadingIcon>
//               </UploadedResumeContainer>
//               <LastUpdated>Last updated 13 days ago</LastUpdated>
//             </SectionBody>
//           </SectionContent>
//         </ResumeDocumentSection>
//         <Label>Summary</Label>
//         <SummarySection>
//           <SectionContent>
//             <SectionHeading>
//               <SummarySectionText>
//                 A passionate Self-Taught Developer who aspires to create
//                 meaningful projects that gives positive impact to the society.
//                 Motivated, problem solver, flexible and eager to learn new tools
//                 and technology. Seeking a position as a Developer where my
//                 extensive experience will be further developed and utilized.
//               </SummarySectionText>
//               <SectionHeadingIcon>
//                 <HiPencil />
//               </SectionHeadingIcon>
//             </SectionHeading>
//           </SectionContent>
//         </SummarySection>
//         <Label>Links</Label>
//         <LinksSection>
//           <LinkContainer>
//             <SectionContent>
//               <SectionHeading>
//                 <SummarySectionText>
//                   LinkedIn:
//                   https://www.linkedin.com/in/siegfred-gamboa-xxxxxxxxx/
//                 </SummarySectionText>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//               </SectionHeading>
//             </SectionContent>
//           </LinkContainer>
//           <LinkContainer>
//             <SectionContent>
//               <SectionHeading>
//                 <SummarySectionText>
//                   Github: https://github.com/iamtigermaximus
//                 </SummarySectionText>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//               </SectionHeading>
//             </SectionContent>
//           </LinkContainer>
//         </LinksSection>
//         <Label>Skills</Label>
//         <SkillsSection>
//           <SkillsWrapper>
//             <SkillContainer>ReactJS</SkillContainer>
//             <SkillContainer>Typescript</SkillContainer>
//             <SkillContainer>NextJS</SkillContainer>
//             <SkillContainer>NodeJS</SkillContainer>
//             <SkillContainer>NodeJS</SkillContainer>
//             <SkillContainer>NodeJS</SkillContainer>
//             <SkillContainer>NodeJS</SkillContainer>
//             <SkillContainer>NodeJS</SkillContainer>
//             <SkillContainer>NodeJS</SkillContainer>
//           </SkillsWrapper>
//         </SkillsSection>
//         <AddLabelContainer>
//           <Label>Work Experience</Label>
//           <AddButton>Add</AddButton>
//         </AddLabelContainer>
//         <ExperienceSection>
//           <WorkSectionContent>
//             <SectionHeading>
//               <SectionHeadingText>
//                 <h4>Frontend Developer</h4>
//                 <h4>Emmy Clothing Company</h4>
//               </SectionHeadingText>
//               <div>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//                 <SectionHeadingIcon>
//                   <HiTrash />
//                 </SectionHeadingIcon>
//               </div>
//             </SectionHeading>
//             <SectionBody>
//               <h4>Finland</h4>
//               <h4>
//                 Debug errors, troubleshoot issues and perform routine
//                 performance optimization and usability
//               </h4>
//               <h4>Make suggestions for better solutions to problems</h4>
//               <h4>
//                 Collaborate with other team members and discuss possible
//                 solutions to issues
//               </h4>
//               <h4>Maintain and improve company's website (webstore)</h4>
//             </SectionBody>
//           </WorkSectionContent>
//           <WorkSectionContent>
//             <SectionHeading>
//               <SectionHeadingText>
//                 <h4>Frontend Developer</h4>
//                 <h4>Emmy Clothing Company</h4>
//               </SectionHeadingText>
//               <div>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//                 <SectionHeadingIcon>
//                   <HiTrash />
//                 </SectionHeadingIcon>
//               </div>
//             </SectionHeading>
//             <SectionBody>
//               <h4>Finland</h4>
//               <h4>
//                 Debug errors, troubleshoot issues and perform routine
//                 performance optimization and usability
//               </h4>
//               <h4>Make suggestions for better solutions to problems</h4>
//               <h4>
//                 Collaborate with other team members and discuss possible
//                 solutions to issues
//               </h4>
//               <h4>Maintain and improve company's website (webstore)</h4>
//             </SectionBody>
//           </WorkSectionContent>
//         </ExperienceSection>
//         <Label>Education</Label>
//         <EducationSection>
//           <WorkSectionContent>
//             <SectionHeading>
//               <SectionHeadingText>
//                 <h4>Educational Degree</h4>
//                 <h4>University of Helsinki</h4>
//               </SectionHeadingText>
//               <div>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//                 <SectionHeadingIcon>
//                   <HiTrash />
//                 </SectionHeadingIcon>
//               </div>
//             </SectionHeading>
//             <SectionBody>
//               <SectionHeadingIcon>
//                 <HiCalendarDays /> 12/21/2023
//               </SectionHeadingIcon>
//               <h4> Helsinki,Finland</h4>
//             </SectionBody>
//           </WorkSectionContent>
//           <WorkSectionContent>
//             <SectionHeading>
//               <SectionHeadingText>
//                 <h4>Educational Degree</h4>
//                 <h4>University of Helsinki</h4>
//               </SectionHeadingText>
//               <div>
//                 <SectionHeadingIcon>
//                   <HiPencil />
//                 </SectionHeadingIcon>
//                 <SectionHeadingIcon>
//                   <HiTrash />
//                 </SectionHeadingIcon>
//               </div>
//             </SectionHeading>
//             <SectionBody>
//               <SectionHeadingIcon>
//                 <HiCalendarDays /> 12/21/2023
//               </SectionHeadingIcon>
//               <h4> Helsinki,Finland</h4>
//             </SectionBody>
//           </WorkSectionContent>
//         </EducationSection>
//       </ProfileContainer>
//     </Container>
//   );
// };

// export default Account;

import React from 'react';

const Account = () => {
  return <div>Account</div>;
};

export default Account;
