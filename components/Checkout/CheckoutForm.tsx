import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { formatAmountForDisplay } from 'utils/stripe-helpers';
import getStripe from 'utils/get-stripejs';
import fetchJson from 'utils/fetchJson';
import {
  OneTimeDonationSchema,
  RecurringDonationSchema
} from 'utils/validation-schema';
import { DonationRequestBody, IntervalOptions } from 'common/types';
import * as config from '../../config';

type CheckoutFormProps = {
  isRecurring: boolean;
};

type FormValues = {
  email: string;
  amount: string;
  interval: IntervalOptions;
};

const intervalOptions: IntervalOptions[] = [
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

  const handleChange = (nextValue: IntervalOptions) => {
    setInterval(nextValue);
    if (nextValue === IntervalOptions.quarter) {
      setIntervalCount(3);
    }
  };

  return (
    <div className="w-1/2 h-96 bg-white rounded shadow-md mt-2 p-4">
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
            <Form>
              <div>
                <input
                  id="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                />
                <input
                  id="donation"
                  value={props.values.amount}
                  name="amount"
                  placeholder={config.MIN_AMOUNT.toString()}
                  min={config.MIN_AMOUNT}
                  max={config.MAX_AMOUNT}
                  onChange={props.handleChange}
                />
                {isRecurring && (
                  <select
                    id="interval"
                    name="interval"
                    onChange={event =>
                      handleChange(event.target.value as IntervalOptions)
                    }
                  >
                    {intervalOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  style={{ marginTop: '2rem', width: '100%' }}
                  disabled={loading}
                >
                  Donate{' '}
                  {formatAmountForDisplay(
                    +props.values.amount,
                    config.CURRENCY
                  )}{' '}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
