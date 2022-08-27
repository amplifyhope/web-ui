import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { formatAmountForDisplay } from 'utils/stripe-helpers'
import getStripe from 'utils/get-stripejs'
import fetchJson from 'utils/fetchJson'
import {
  OneTimeDonationSchema,
  RecurringDonationSchema
} from 'utils/validation-schema'
import { DonationRequestBody, IntervalOptions, FundOptions } from 'common/types'
import * as config from '../../config'

type CheckoutFormProps = {
  isRecurring: boolean
}

type FormValues = {
  email: string
  amount: string
  interval: IntervalOptions
  fund: FundOptions
}

const intervalOptions: IntervalOptions[] = [
  IntervalOptions.month,
  IntervalOptions.quarter,
  IntervalOptions.year
]

const fundOptions: FundOptions[] = [FundOptions.general, FundOptions.hope40]

export const CheckoutForm = (props: CheckoutFormProps) => {
  const { isRecurring } = props
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className='p-6 mt-2 w-full bg-white rounded shadow-md lg:h-96'>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: '',
          amount: '',
          interval: '',
          fund: ''
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
            interval: isRecurring ? formValues.interval : undefined,
            fund: formValues.fund
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
                  <Field
                    id='email'
                    value={props.values.email}
                    onChange={props.handleChange}
                    type='email'
                    name='email'
                    placeholder='user@example.com'
                    className='w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                  />
                  <ErrorMessage
                    name='email'
                    className='text-sm text-red-500'
                    component='a'
                  />
                </div>
                <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between w-full mb-4'>
                  <div
                    className={`${
                      isRecurring ? 'w-full lg:w-1/2 lg:mr-2' : 'w-full'
                    }`}
                  >
                    <label>Amount</label>
                    <Field
                      id='donation'
                      value={props.values.amount}
                      name='amount'
                      placeholder='Donation Amount'
                      min={config.MIN_AMOUNT}
                      max={config.MAX_AMOUNT}
                      onChange={props.handleChange}
                      className='w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                    />
                    <ErrorMessage
                      name='amount'
                      className='text-sm text-red-500'
                      component='a'
                    />
                  </div>
                  {isRecurring && (
                    <div className='relative w-full lg:w-1/2 lg:ml-2 mt-4'>
                      <label>Interval</label>
                      <Field
                        as='select'
                        id='interval'
                        name='interval'
                        onChange={props.handleChange}
                        className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                      >
                        <option
                          value=''
                          disabled
                          selected
                          hidden
                          className='text-slate-400'
                        >
                          Choose an interval
                        </option>
                        {intervalOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name='interval'
                        className='text-sm text-red-500'
                        component='a'
                      />
                      <div className='absolute inset-y-0 right-0 flex items-center px-2 mt-5 text-gray-700 pointer-events-none'>
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
                <div className='relative mb-4'>
                  <label>Fund</label>
                  <Field
                    as='select'
                    id='fund'
                    onChange={props.handleChange}
                    name='fund'
                    className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm appearance-none border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1'
                  >
                    <option
                      value=''
                      disabled
                      selected
                      hidden
                      className='text-slate-400'
                    >
                      Choose a Fund
                    </option>
                    {fundOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <div className='absolute inset-y-0 right-0 flex items-center px-2 mt-5 text-gray-700 pointer-events-none'>
                    <svg
                      className='w-4 h-4 fill-current'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                  <ErrorMessage
                    name='fund'
                    className='text-sm text-red-500'
                    component='a'
                  />
                </div>
              </div>
              <button
                type='submit'
                disabled={loading}
                className='mt-4 w-full py-2 border border-solid rounded border-primary hover:bg-black/10 text-primary'
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
