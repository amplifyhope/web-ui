import * as yup from 'yup'

export const OneTimeDonationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Required'),
    amount: yup.number().required('Please enter a valid amount.'),
    fund: yup.string().required('Please specify a fund to donate to.')
  })
  .required()

export const RecurringDonationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Required'),
    amount: yup.number().required('Please enter a valid amount.'),
    interval: yup.string().required('Please select an interval'),
    fund: yup.string().required('Please specify a fund to donate to.')
  })
  .required()
