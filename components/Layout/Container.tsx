import { HTMLAttributes, ReactElement } from 'react';
import { Grid } from '@react-md/utils';

export const Container = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement => {
  return (
    <Grid {...props} clone padding={0} columns={1}>
      {children}
    </Grid>
  );
};
