import * as yup from 'yup'

export const OneTimeDonationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Required'),
    amount: yup.number().required('Please enter a valid amount.'),
    coverFees: yup.boolean().required(),
    fund: yup.string().required('Please specify a fund to donate to.'),
    notes: yup.string().optional()
  })
  .required()

export const RecurringDonationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Required'),
    amount: yup.number().required('Please enter a valid amount.'),
    coverFees: yup.boolean().required(),
    interval: yup.string().required('Please select an interval'),
    fund: yup.string().required('Please specify a fund to donate to.'),
    notes: yup.string().optional()
  })
  .required()

export const LoginWithEmailSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Required')
  })
  .required()
