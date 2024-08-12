'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';

export const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    padding: 20px 50px;
  }
`;

export const SubscriptionOption = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  /* border-radius: 8px; */
  padding: 20px;
  margin: 10px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  height: 500px;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (min-width: ${bp.lg}) {
    height: 500px;
    margin: 20px;
  }
`;

export const SubscriptionTitle = styled.h2`
  font-size: 24px;
`;

export const SubscriptionDescription = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

export const SubscriptionPrice = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const PaymentOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px; */

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    padding: 20px;
  }
`;

export const PaymentOption = styled.div`
  /* margin: 5px; */

  @media (min-width: ${bp.lg}) {
    margin: none;
  }
`;

export const PaymentButton = styled.button`
  /* background-color: #6a0c8e; */
  background-color: white;
  margin: 10px;
  width: 300px;
  color: black;
  height: 50px;
  /* border: none; */
  border: 1px solid gray;
  /* border-radius: 8px; */
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #520668;
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    height: 100px;
    width: 200px;
  }
`;
