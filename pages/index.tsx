import type { NextPage } from 'next';
import { CheckoutForm, Container } from 'components';
import { TabsManager, Tabs, TabPanels, TabPanel } from '@react-md/tabs';

const tabs = ['One Time Donation', 'Recurring Donation'];

const Home: NextPage = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <img
        src="/images/logo-linear.svg"
        alt="Amplify Hope"
        style={{ height: '4rem' }}
      />
      <TabsManager tabs={tabs} tabsId="donation-type">
        <Tabs />
        <TabPanels>
          <TabPanel>
            <CheckoutForm isRecurring={false} />
          </TabPanel>
          <TabPanel>
            <CheckoutForm isRecurring={true} />
          </TabPanel>
        </TabPanels>
      </TabsManager>
    </Container>
  );
};

export default Home;
