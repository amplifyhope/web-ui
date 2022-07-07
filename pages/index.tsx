import type { NextPage } from 'next';
import { CheckoutForm } from 'components';
import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.indexContainer}>
      <CheckoutForm isRecurring={false} />
      <CheckoutForm isRecurring={true} />
    </div>
  );
};

export default Home;
