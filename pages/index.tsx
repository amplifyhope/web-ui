import type { NextPage } from 'next';
import { CheckoutForm } from 'components';

const Home: NextPage = () => {
  return (
    <div>
      <CheckoutForm isRecurring={false} />
      <CheckoutForm isRecurring={true} />
    </div>
  );
};

export default Home;
