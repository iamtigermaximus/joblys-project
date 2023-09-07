import React from 'react';
import { Container } from '@/app/page.styles';
import PageHeader from '@/components/page-header/PageHeader';
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
