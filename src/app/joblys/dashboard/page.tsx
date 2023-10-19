import React from 'react';
import { Container } from '@/app/page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import Dashboard from './Dashboard';

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
