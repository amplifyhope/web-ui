import { ChangeEvent } from "react";
import { TextField } from "@react-md/form";
import { formatAmountForDisplay } from "utils/stripe-helpers";

type CustomDonationInputProps = {
  name: string;
  value: string;
  min: number;
  max: number;
  currency: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string
};

export const CustomDonationInput = ({
  name,
  value,
  min,
  max,
  currency,
  onChange,
  className
}: CustomDonationInputProps) => {
  return (
    <label>
      Custom donation amount ({formatAmountForDisplay(min, currency)} - {formatAmountForDisplay(max, currency)})
      <TextField 
        id="price"
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
}
