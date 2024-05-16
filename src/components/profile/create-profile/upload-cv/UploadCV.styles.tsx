'use client';

import { breakpoints as bp } from '@/utils/layout';
import colors from '@/utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 30px;

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const UploadCvContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 30px 20px;
  margin: 20px;
  flex-direction: column;

  @media (min-width: ${bp.sm}) {
    max-width: 400px;
    padding: 30px 40px;
  }

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  color: ${colors.purple};
  padding: 5px;
  letter-spacing: 1px;
  font-size: 20px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;

export const SectionSubTitle = styled.h5`
  color: black;
  padding: 10px;
  letter-spacing: 1px;
  font-size: 13px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const FileNameContainer = styled.div`
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  font-size: 12px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    margin: 10px;
  }
`;

export const FileUpload = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.purple};
  color: ${colors.white};
  border-radius: 5px;
  font-size: 12px;
  margin: 5px;
  padding: 20px 6px;
  margin: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 30px 20px;
    margin: 10px;
  }
`;

export const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 10px;
  background-color: ${colors.orange};
  color: ${colors.white};
  margin: 5px;
  font-size: 12px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    margin: 10px;
  }
`;

export const UploadButton = styled.button`
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.ashGray};
  color: ${colors.purple};
  margin: 5px;
  padding: 10px;
  font-size: 12px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    margin: 10px;
  }
`;

export const UploadSourceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const LoadingMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoadingMessage = styled.p`
  color: green;
  margin-top: 10px;
`;
