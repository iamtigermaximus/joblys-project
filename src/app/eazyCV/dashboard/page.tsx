import React from 'react';
import { Container } from '../page.styles';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <Container>
      <div>
        <title>DASHBOARD</title>
      </div>
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;
