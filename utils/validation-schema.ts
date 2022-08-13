import * as yup from 'yup'

export const OneTimeDonationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Required'),
    amount: yup.number().required()
  })
  .required()

export const RecurringDonationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Required'),
    amount: yup.number().required(),
    interval: yup.string().required()
  })
  .required()
