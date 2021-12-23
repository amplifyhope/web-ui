import React from "react";
import { Grid, GridCell } from "@react-md/utils";
import { Typography } from "@react-md/typography";

const App = () => {
  return (
    <Grid>
      <GridCell colSpan={12}>
        <Typography type="headline-1">Hello There...</Typography>
      </GridCell>
    </Grid>
  );
};

export default App;
