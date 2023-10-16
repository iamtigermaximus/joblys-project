import React from 'react';
import {
  ActivitiesContainer,
  ActivityContainer,
  Button,
  ButtonsContainer,
  Container,
  RecentActivitySection,
  RecentActivityTitle,
  ReviewButton,
} from './RecentActivity.styles';

const RecentActivity = () => {
  return (
    <Container>
      <RecentActivitySection>
        <RecentActivityTitle>Your recent activity</RecentActivityTitle>
        <ButtonsContainer>
          <Button>Saved</Button>
          <Button>Applied</Button>
          <Button>Disliked</Button>
        </ButtonsContainer>
        <ActivitiesContainer>
          <ActivityContainer>
            <div>Software developer Helsinki</div>
            <ReviewButton>Review</ReviewButton>
          </ActivityContainer>
          <ActivityContainer>
            <div>Developer Tampere</div> <ReviewButton>Review</ReviewButton>
          </ActivityContainer>
        </ActivitiesContainer>
      </RecentActivitySection>
    </Container>
  );
};

export default RecentActivity;
