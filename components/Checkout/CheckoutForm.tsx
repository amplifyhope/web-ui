import React, { useState, useCallback } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from '@react-md/button';
import { Card, CardContent } from '@react-md/card';
import { TextField, Select, FormMessage, ListboxOption } from '@react-md/form';
import { EmailSVGIcon } from '@react-md/material-icons';
import { Grid, GridCell } from '@react-md/utils';
import Stripe from 'stripe';
import { CustomDonationInput, Loading, Container } from 'components';
import { formatAmountForDisplay } from 'utils/stripe-helpers';
import getStripe from 'utils/get-stripejs';
import fetchJson from 'utils/fetchJson';
import {
  OneTimeDonationSchema,
  RecurringDonationSchema
} from 'utils/validation-schema';
import { DonationRequestBody } from 'common/types';
import * as config from '../../config';

type CheckoutFormProps = {
  isRecurring: boolean;
};

type FormValues = {
  email: string;
  amount: string;
  interval: Stripe.Price.Recurring.Interval;
};

const intervalOptions = ['week', 'month', 'year'];

export const CheckoutForm = (props: CheckoutFormProps) => {
  const { isRecurring } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [interval, setInterval] =
    useState<Stripe.Price.Recurring.Interval>('month');

  const handleChange = useCallback(
    (nextValue: Stripe.Price.Recurring.Interval, _option: ListboxOption) => {
      setInterval(nextValue);
    },
    []
  );

  return (
    <Container>
      <Grid>
        <GridCell colSpan={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email: '',
                  amount: Math.round(config.MIN_AMOUNT).toFixed(2).toString(),
                  interval
                }}
                validationSchema={
                  isRecurring ? RecurringDonationSchema : OneTimeDonationSchema
                }
                onSubmit={async (
                  formValues: FormValues,
                  { setSubmitting }: FormikHelpers<FormValues>
                ) => {
                  setLoading(true);
                  const amount: number = +formValues.amount;
                  const requestBody: DonationRequestBody = {
                    email: formValues.email,
                    amount,
                    interval: isRecurring ? formValues.interval : undefined
                  };

                  const response = await fetchJson(
                    `/api/checkouts/${isRecurring ? 'recurring' : 'one-time'}`,
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(requestBody)
                    }
                  );

                  const stripe = await getStripe();
                  const { error } = await stripe!.redirectToCheckout({
                    sessionId: response.id
                  });
                  console.warn(error.message);
                  setLoading(false);
                  setSubmitting(false);
                }}
              >
                {props => {
                  return (
                    <Form>
                      <TextField
                        id="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        theme="outline"
                        type="email"
                        rightChildren={<EmailSVGIcon />}
                        label="Email"
                        name="email"
                        placeholder="user@example.com"
                        error={Boolean(props.errors.email)}
                        // style={{ marginBottom: '2rem' }}
                      />
                      <FormMessage id="email-message" error>
                        {props.errors.email}
                      </FormMessage>
                      <CustomDonationInput
                        name="customDonation"
                        value={props.values.amount}
                        min={config.MIN_AMOUNT}
                        max={config.MAX_AMOUNT}
                        currency={config.CURRENCY}
                        onChange={props.handleChange}
                      />
                      {isRecurring && (
                        <Select
                          id="interval"
                          options={intervalOptions}
                          value={props.values.interval}
                          onChange={handleChange}
                        />
                      )}
                      <Button
                        type="submit"
                        style={{ marginTop: '2rem', width: '100%' }}
                        disabled={loading}
                        theme="primary"
                        themeType="outline"
                      >
                        {!loading ? (
                          <>
                            Donate{' '}
                            {formatAmountForDisplay(
                              +props.values.amount,
                              config.CURRENCY
                            )}{' '}
                          </>
                        ) : (
                          <Loading />
                        )}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </CardContent>
          </Card>
        </GridCell>
      </Grid>
    </Container>
  );
};
