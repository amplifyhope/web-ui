import { Container } from 'components';
import { CircularProgress } from '@react-md/progress';
import { Grid, GridCell } from '@react-md/utils';

export const Loading = () => {
  return (
    <Container>
      <Grid>
        <GridCell colSpan={12}>
          <CircularProgress id="loading" color='primary' />
        </GridCell>
      </Grid>
    </Container>
  );
};
