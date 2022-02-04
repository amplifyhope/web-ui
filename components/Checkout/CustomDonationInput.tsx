import { ChangeEvent } from 'react';
import { TextField } from '@react-md/form';
import { Typography } from '@react-md/typography';
import { AttachMoneySVGIcon } from '@react-md/material-icons';

type CustomDonationInputProps = {
  name: string;
  value: string;
  min: number;
  max: number;
  currency: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const CustomDonationInput = ({
  name,
  value,
  min,
  max,
  onChange,
  className
}: CustomDonationInputProps) => {
  return (
    <label>
      <Typography type="headline-5">
        Specify the amount you would like to donate
      </Typography>
      <TextField
        id="price"
        theme="underline"
        leftChildren={<AttachMoneySVGIcon />}
        className={className}
        type="number"
        value={value}
        name={name}
        min={min}
        max={max}
        onChange={onChange}
      />
    </label>
  );
};
