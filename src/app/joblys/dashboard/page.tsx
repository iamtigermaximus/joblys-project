import React from 'react';
import PageHeader from '@/components/common/page-header/PageHeader';
import Dashboard from './Dashboard';
import { Container } from '../page.styles';

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
