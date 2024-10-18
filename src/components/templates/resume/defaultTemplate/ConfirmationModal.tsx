import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  color: gray;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ConfirmationMessage = styled.p`
  font-size: 16px;
`;
const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const t = useTranslations('ConfirmationModal');

  return (
    <>
      <BackgroundOverlay />
      <ModalContainer>
        <ModalContent>
          <ConfirmationMessage>{t('confirmation')}</ConfirmationMessage>
          <ButtonContainer>
            <DeleteButton onClick={onConfirm}>{t('delete')}</DeleteButton>
            <CancelButton onClick={onCancel}>{t('cancel')}</CancelButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default ConfirmationModal;
