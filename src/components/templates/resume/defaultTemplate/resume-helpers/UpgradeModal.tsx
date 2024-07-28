import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  text-align: center;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
`;

const ModalHeader = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;

  @media (min-width: ${bp.sm}) {
    font-size: 26px;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
  font-size: 14px;

  @media (min-width: ${bp.sm}) {
    font-size: 16px;
  }

  @media (min-width: ${bp.md}) {
    font-size: 20px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  @media (min-width: ${bp.sm}) {
    font-size: 16px;
  }
`;

const UpgradeButton = styled(Button)`
  background-color: #0070f3;
  color: white;
`;

const CloseButton = styled(Button)`
  background-color: #e0e0e0;
`;

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  const handleUpgrade = () => {
    // Redirect user to upgrade page or handle upgrade logic
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Upgrade Your Plan</ModalHeader>
        <ModalBody>
          <p>You have reached the limit of 10 resumes.</p>
          <p>Upgrade your plan to create more resumes.</p>
        </ModalBody>
        <ModalFooter>
          <UpgradeButton onClick={handleUpgrade}>Upgrade Now</UpgradeButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UpgradeModal;
