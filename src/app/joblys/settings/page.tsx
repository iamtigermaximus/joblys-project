import PageHeader from '@/components/common/page-header/PageHeader';
import { Container } from '../page.styles';
import Settings from '@/components/settings/Settings';

const SettingsPage = () => {
  return (
    <Container>
      <div>
        <title>SETTINGS</title>
      </div>
      {/* <PageHeader /> */}
      <Settings />
    </Container>
  );
};

export default SettingsPage;
