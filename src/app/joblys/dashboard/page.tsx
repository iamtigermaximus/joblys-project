import React from 'react';
import PageHeader from '@/components/common/page-header/PageHeader';
import { Container } from '../page.styles';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <Container>
      <div>
        <title>DASHBOARD</title>
      </div>
      <PageHeader />
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;
