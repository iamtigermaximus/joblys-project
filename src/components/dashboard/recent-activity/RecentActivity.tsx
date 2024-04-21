import React from 'react';
import {
  ActivitiesContainer,
  ActivityContainer,
  ActivityTexts,
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
            <ActivityTexts>Software developer Helsinki</ActivityTexts>
            <ReviewButton>Review</ReviewButton>
          </ActivityContainer>
          <ActivityContainer>
            <ActivityTexts>Developer Tampere</ActivityTexts>{' '}
            <ReviewButton>Review</ReviewButton>
          </ActivityContainer>
        </ActivitiesContainer>
      </RecentActivitySection>
    </Container>
  );
};

export default RecentActivity;
