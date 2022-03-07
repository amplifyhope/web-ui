import {
  useState,
  useMemo,
  useCallback,
  ChangeEventHandler,
  FormEventHandler
} from 'react';
import {
  Form,
  TextFieldWithMessage,
  useTextField,
  ErrorChangeHandler,
  Radio
} from '@react-md/form';
import { Button } from '@react-md/button';
import { Card, CardContent } from '@react-md/card';
import { Grid, GridCell } from '@react-md/utils';
import { Typography } from '@react-md/typography';
import { EmailSVGIcon } from '@react-md/material-icons';
import { CustomDonationInput, Loading, Container } from 'components';
import { formatAmountForDisplay } from 'utils/stripe-helpers';
import getStripe from 'utils/get-stripejs';
import fetchJson from 'utils/fetchJson';
import * as config from '../../config';

type FieldId = string;
type ErrorRecord = Record<FieldId, boolean | undefined>;

export const CheckoutForm = () => {
  const [errors, setErrors] = useState<ErrorRecord>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [mode, setMode] = useState<string>('one-time');
  const [input, setInput] = useState({
    customDonation: Math.round(config.MIN_AMOUNT).toFixed(2).toString()
  });

  const errored = useMemo(() => Object.values(errors).some(Boolean), [errors]);
  const onErrorChange = useCallback<ErrorChangeHandler>(
    (id, error) => setErrors(prevErrors => ({ ...prevErrors, [id]: error })),
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_email, emailFieldProps] = useTextField({
    id: 'email-field-hook',
    required: true,
    pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$',
    onErrorChange
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    return setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setLoading(true);
    const amount: number = +input.customDonation;

    const response = await fetchJson('/api/checkout-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, email, mode })
    });

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id
    });
    console.warn(error.message);
    setLoading(false);
  };
  
  return (
    <Container>
      <Grid>
        <GridCell colSpan={12}>
          <Card>
            <CardContent>
              <Form onSubmit={handleSubmit}>
                <Typography type="headline-5">
                  Support Amplify Hope by Donating
                </Typography>
                <section onChange={e => setMode(e.target.value)}>
                  <Radio
                    id="one-time"
                    name="mode"
                    label="One-Time Payment"
                    value="one-time"
                    defaultChecked
                  />
                  <Radio
                    id="recurring"
                    name="mode"
                    label="Recurring Payment"
                    value="recurring"
                  />
                </section>
                <TextFieldWithMessage
                  {...emailFieldProps}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  theme="outline"
                  type="email"
                  rightChildren={<EmailSVGIcon />}
                  label="Email"
                  name="email"
                  placeholder="user@example.com"
                  // style={{ marginBottom: '2rem' }}
                />
                <CustomDonationInput
                  name="customDonation"
                  value={input.customDonation}
                  min={config.MIN_AMOUNT}
                  max={config.MAX_AMOUNT}
                  currency={config.CURRENCY}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  style={{ marginTop: '2rem', width: '100%' }}
                  disabled={loading || errored}
                  theme="primary"
                  themeType="outline"
                >
                  {!loading ? (
                    <>
                      Donate{' '}
                      {formatAmountForDisplay(
                        +input.customDonation,
                        config.CURRENCY
                      )}{' '}
                    </>
                  ) : (
                    <Loading />
                  )}
                </Button>
              </Form>
            </CardContent>
          </Card>
        </GridCell>
      </Grid>
    </Container>
  );
};
