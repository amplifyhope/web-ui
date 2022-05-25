import React, { useState, useCallback } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from '@react-md/button';
import { Card, CardContent, CardActions } from '@react-md/card';
import { TextField, Select, FormMessage, ListboxOption } from '@react-md/form';
import { EmailSVGIcon, AttachMoneySVGIcon } from '@react-md/material-icons';
import { Grid, GridCell } from '@react-md/utils';
import { Loading } from 'components';
import { formatAmountForDisplay } from 'utils/stripe-helpers';
import getStripe from 'utils/get-stripejs';
import fetchJson from 'utils/fetchJson';
import {
  OneTimeDonationSchema,
  RecurringDonationSchema
} from 'utils/validation-schema';
import { DonationRequestBody, IntervalOptions } from 'common/types';
import * as config from '../../config';

import styles from './CheckoutForm.module.scss';

type CheckoutFormProps = {
  isRecurring: boolean;
};

type FormValues = {
  email: string;
  amount: string;
  interval: IntervalOptions;
};

const intervalOptions = [
  IntervalOptions.month,
  IntervalOptions.quarter,
  IntervalOptions.year
];

export const CheckoutForm = (props: CheckoutFormProps) => {
  const { isRecurring } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [intervalCount, setIntervalCount] = useState<number>(1);
  const [interval, setInterval] = useState<IntervalOptions>(
    IntervalOptions.month
  );

  const handleChange = useCallback(
    (nextValue: IntervalOptions, _option: ListboxOption) => {
      setInterval(nextValue);
      if (nextValue === IntervalOptions.quarter) {
        setIntervalCount(3);
      }
    },
    []
  );

  return (
    <Grid>
      <GridCell colSpan={12}>
        <Card className={styles.checkoutFormCard}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: '',
              amount: Math.round(config.MIN_AMOUNT).toFixed(2).toString(),
              interval: IntervalOptions.month
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
                interval: isRecurring ? interval : undefined,
                interval_count: intervalCount
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
                <Form className={styles.checkoutForm}>
                  <CardContent>
                    <Grid>
                      <GridCell colSpan={12}>
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
                        />
                        <FormMessage id="email-message" error>
                          {props.errors.email}
                        </FormMessage>
                      </GridCell>
                      <GridCell colSpan={!isRecurring ? 12 : 6}>
                        <TextField
                          id="donation"
                          theme="outline"
                          leftChildren={<AttachMoneySVGIcon />}
                          value={props.values.amount}
                          label="Amount"
                          name="amount"
                          placeholder={config.MIN_AMOUNT.toString()}
                          min={config.MIN_AMOUNT}
                          max={config.MAX_AMOUNT}
                          onChange={props.handleChange}
                          error={Boolean(props.errors.amount)}
                        />
                        <FormMessage id="amount-message" error>
                          {props.errors.amount}
                        </FormMessage>
                      </GridCell>
                      <GridCell colSpan={6}>
                        {isRecurring && (
                          <Select
                            id="interval"
                            options={intervalOptions}
                            value={interval}
                            onChange={handleChange}
                          />
                        )}
                      </GridCell>
                    </Grid>
                  </CardContent>
                  <CardActions>
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
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </GridCell>
    </Grid>
  );
};
