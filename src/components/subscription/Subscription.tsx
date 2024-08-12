'use client';
import React from 'react';
import {
  OptionsContainer,
  PaymentButton,
  PaymentContainer,
  PaymentOption,
  PaymentOptionContainer,
  SubscriptionContainer,
  SubscriptionDescription,
  SubscriptionOption,
  SubscriptionPrice,
  SubscriptionTitle,
} from './Subscription.styles';

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
