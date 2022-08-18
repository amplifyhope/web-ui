import React, { useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { formatAmountForDisplay } from 'utils/stripe-helpers'
import getStripe from 'utils/get-stripejs'
import fetchJson from 'utils/fetchJson'
import {
  OneTimeDonationSchema,
  RecurringDonationSchema
} from 'utils/validation-schema'
import { DonationRequestBody, IntervalOptions } from 'common/types'
import * as config from '../../config'

type CheckoutFormProps = {
  isRecurring: boolean
}

type FormValues = {
  email: string
  amount: string
  interval: IntervalOptions
}

const intervalOptions: IntervalOptions[] = [
  IntervalOptions.month,
  IntervalOptions.quarter,
  IntervalOptions.year
]

export const CheckoutForm = (props: CheckoutFormProps) => {
  const { isRecurring } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [intervalCount, setIntervalCount] = useState<number>(1)
  const [interval, setInterval] = useState<IntervalOptions>(
    IntervalOptions.month
  )

  const handleChange = (nextValue: IntervalOptions) => {
    setInterval(nextValue)
    if (nextValue === IntervalOptions.quarter) {
      setIntervalCount(3)
    }
  }

  return (
    <div className='w-1/2 p-6 mt-2 bg-white rounded shadow-md h-96'>
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
          setLoading(true)
          const amount: number = +formValues.amount
          const requestBody: DonationRequestBody = {
            email: formValues.email,
            amount,
            interval: isRecurring ? interval : undefined,
            interval_count: intervalCount
          }

          const response = await fetchJson(
            `/api/checkouts/${isRecurring ? 'recurring' : 'one-time'}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            }
          )

          const stripe = await getStripe()
          const { error } = await stripe!.redirectToCheckout({
            sessionId: response.id
          })
          console.warn(error.message)
          setLoading(false)
          setSubmitting(false)
        }}
      >
        {props => {
          return (
            <Form className='flex flex-col items-center justify-between w-full h-full'>
              <div className='w-full'>
                <div className='mb-4'>
                  <label>Email</label>
                  <input
                    id='email'
                    value={props.values.email}
                    onChange={props.handleChange}
                    type='email'
                    name='email'
                    placeholder='user@example.com'
                    className='w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                  />
                </div>
                <div className='mb-4 flex items-center justify-between w-full'>
                  <div className={`${isRecurring ? 'w-5/12' : 'w-full'}`}>
                    <label>Amount</label>
                    <input
                      id='donation'
                      value={props.values.amount}
                      name='amount'
                      placeholder={config.MIN_AMOUNT.toString()}
                      min={config.MIN_AMOUNT}
                      max={config.MAX_AMOUNT}
                      onChange={props.handleChange}
                      className='w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                    />
                  </div>
                  {isRecurring && (
                    <div className='relative w-5/12'>
                      <label>Interval</label>
                      <select
                        id='interval'
                        name='interval'
                        onChange={event =>
                          handleChange(event.target.value as IntervalOptions)
                        }
                        className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                      >
                        {intervalOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className='absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none'>
                        <svg
                          className='w-4 h-4 fill-current'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                type='submit'
                disabled={loading}
                className='w-full py-2 border border-solid rounded border-primary hover:bg-black/10 text-primary'
              >
                Donate{' '}
                {formatAmountForDisplay(+props.values.amount, config.CURRENCY)}{' '}
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
