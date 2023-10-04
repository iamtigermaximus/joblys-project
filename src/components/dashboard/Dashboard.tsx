// 'use client';
// import React from 'react';
// import {
//   ActivitiesContainer,
//   Button,
//   Container,
//   HeaderContainer,
//   RecentActivitySection,
//   RecentSearchContainer,
//   RecentSearchesSection,
//   UserInfo,
// } from './Dashboard.styles';
// import { useSession } from 'next-auth/react';

// const Dashboard = () => {
//   const { data: session } = useSession();

//   return (
//     <Container>
//       <HeaderContainer>
//         {session ? (
//           <UserInfo>
//             <h3>Hi, USERNAME</h3>
//             <h4>Frontend Developer</h4>
//             <h4>Helsinki</h4>
//           </UserInfo>
//         ) : null}
//       </HeaderContainer>
//       <RecentActivitySection>
//         <h3>Recent Activity</h3>
//         <ActivitiesContainer>
//           <Button>Saved</Button>
//           <Button>Applied</Button>
//           <Button>Dislike</Button>
//         </ActivitiesContainer>
//       </RecentActivitySection>
//       <RecentSearchesSection>
//         <h3>Recent Searches</h3>
//         <RecentSearchContainer>
//           <h4>Most Popular Jobs in Helsinki </h4>
//           <Button>Search</Button>
//         </RecentSearchContainer>
//         <RecentSearchContainer>
//           <h4>Most Popular Jobs in Turku </h4>
//           <Button>Search</Button>
//         </RecentSearchContainer>
//       </RecentSearchesSection>
//     </Container>
//   );
// };

// export default Dashboard;

'use client';

import React from 'react';

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
