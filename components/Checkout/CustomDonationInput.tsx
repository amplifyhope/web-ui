import React, { ChangeEvent } from 'react';
import { TextField } from '@react-md/form';
import { AttachMoneySVGIcon } from '@react-md/material-icons';

type CustomDonationInputProps = {
  name: string;
  value: string;
  min: number;
  max: number;
  currency: string;
  onChange: (event: ChangeEvent<any>) => void;
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
      <TextField
        id="price"
        theme="outline"
        leftChildren={<AttachMoneySVGIcon />}
        className={className}
        type="number"
        value={value}
        name={name}
        min={min}
        max={max}
        onChange={onChange}
        label="Amount"
      />
    </label>
  );
};
