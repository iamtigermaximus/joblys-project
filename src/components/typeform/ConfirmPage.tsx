import React from 'react';
import styled from 'styled-components';

// Styled component for the confirmation message
const ConfirmationMessage = styled.h1`
  color: #333;
`;

const ConfirmPage: React.FC = () => {
  return (
    <ConfirmationMessage>Congratulations you have done it</ConfirmationMessage>
  );
};

export default ConfirmPage;
