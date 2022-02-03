import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { Form } from '@react-md/form';
import { Button } from '@react-md/button';
import { CustomDonationInput, Loading } from "components";
import { formatAmountForDisplay } from "utils/stripe-helpers";
import getStripe from "utils/get-stripejs";
import fetchJson from "utils/fetchJson";
import * as config from '../../config';

export const CheckoutForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState({
    customDonation: Math.round(config.MIN_AMOUNT).toString()
  })

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    return setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    const amount: number = +input.customDonation

    const response = await fetchJson('/api/checkout/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id
    })
    console.warn(error.message);
    setLoading(false)
    
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CustomDonationInput 
        name="customDonation"
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        currency={config.CURRENCY}
        onChange={handleInputChange}
      />
      <Button 
        type='submit' 
        disabled={loading}
        theme='primary'
        themeType='outline'
      >
        Donate {formatAmountForDisplay(+input.customDonation, config.CURRENCY)} {loading && <Loading />}
      </Button>
    </Form>
  );
};
