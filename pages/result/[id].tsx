import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getCheckoutSession } from 'services/checkout';
import { Loading, Container } from 'components';
import { Typography } from '@react-md/typography';
import { ArrowBackSVGIcon } from '@react-md/material-icons';
import { Button } from '@react-md/button';
import { formatAmountForDisplayFromStripe } from 'utils/stripe-helpers';
import { CURRENCY } from 'config';
import Stripe from 'stripe';

const Result = props => {
  const { id } = props;
  const [session, setSession] = useState<Stripe.Checkout.Session>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCheckout = async () => {
    setLoading(true);
    const checkoutSession = await getCheckoutSession(id);
    setSession(checkoutSession);
    setLoading(false);
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Typography type="headline-5">
        Thank you for your{' '}
        {formatAmountForDisplayFromStripe(session?.amount_total!, CURRENCY)}{' '}
        {session?.mode === 'subscription' ? 'recurring' : null} donation.
      </Typography>
      <div>
        <Link href="/">
          <Button theme="primary" themeType="outline">
            <ArrowBackSVGIcon />
            &nbsp;&nbsp;Back Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  return {
    props: {
      id
    }
  };
};

export default Result;
