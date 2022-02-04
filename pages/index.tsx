import type { NextPage } from 'next';
import { CheckoutForm, Container } from 'components';

const Home: NextPage = () => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <img
        src="/images/logo-linear.svg"
        alt="Amplify Hope"
        style={{ height: '4rem' }}
      />
      <CheckoutForm />
    </Container>
  );
};

export default Home;
