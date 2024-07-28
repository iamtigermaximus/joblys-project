'use client';
import React from 'react';
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

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;

export const SubscriptionOption = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }

  @media (min-width: ${bp.lg}) {
    height: 500px;
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
  padding: 20px;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;

export const PaymentOption = styled.div`
  margin: 5px;

  @media (min-width: ${bp.lg}) {
    margin: none;
  }
`;

export const PaymentButton = styled.button`
  background-color: #6a0c8e;
  margin: 10px;
  width: 300px;
  color: white;
  height: 100px;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #520668;
  }
`;

const Subscription = () => {
  const handleSubscriptionClick = (plan: string) => {
    // Handle subscription selection
    console.log('Selected plan');
  };

  const handlePaymentClick = (method: string) => {
    // Handle payment method selection
    console.log('Selected payment method');
  };

  return (
    <>
      <div></div>
      <SubscriptionContainer>
        <SubscriptionTitle>Choose Your Plan</SubscriptionTitle>
        <OptionsContainer>
          <SubscriptionOption onClick={() => handleSubscriptionClick('basic')}>
            <SubscriptionDescription>Basic Plan</SubscriptionDescription>
            <SubscriptionPrice>$10/month</SubscriptionPrice>
          </SubscriptionOption>
          <SubscriptionOption
            onClick={() => handleSubscriptionClick('premium')}
          >
            <SubscriptionDescription>Premium Plan</SubscriptionDescription>
            <SubscriptionPrice>$20/month</SubscriptionPrice>
          </SubscriptionOption>
          <SubscriptionOption onClick={() => handleSubscriptionClick('pro')}>
            <SubscriptionDescription>Pro Plan</SubscriptionDescription>
            <SubscriptionPrice>$30/month</SubscriptionPrice>
          </SubscriptionOption>
        </OptionsContainer>
      </SubscriptionContainer>
      <PaymentContainer>
        <SubscriptionTitle>Select Payment Method</SubscriptionTitle>
        <PaymentOptionContainer>
          <PaymentOption onClick={() => handlePaymentClick('credit-card')}>
            <PaymentButton>Credit Card</PaymentButton>
          </PaymentOption>
          <PaymentOption onClick={() => handlePaymentClick('paypal')}>
            <PaymentButton>PayPal</PaymentButton>
          </PaymentOption>
          <PaymentOption onClick={() => handlePaymentClick('google-pay')}>
            <PaymentButton>Google Pay</PaymentButton>
          </PaymentOption>
          <PaymentOption onClick={() => handlePaymentClick('direct-debit')}>
            <PaymentButton>SEPA Direct Debit</PaymentButton>
          </PaymentOption>
        </PaymentOptionContainer>
      </PaymentContainer>
    </>
  );
};

export default Subscription;
