import type { NextPage } from 'next';
import { CheckoutForm, Header } from 'components';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-4/5 mx-auto mb-0 border-2 border-red-500 border-dotted mt-14">
        <img className="h-16" src="/images/logo-linear.svg" alt="logo" />
        <CheckoutForm isRecurring={false} />
        <CheckoutForm isRecurring={true} />
      </div>
    </div>
  );
};

export default Home;
