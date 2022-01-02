import React from 'react';
import { Typography } from '@react-md/typography';
import { Button } from '@react-md/button';

import './styles/app.scss';

const App = () => {
  return (
    <section>
      <section>
        <Typography type="headline-4">Contained</Typography>
        <Button theme="primary" themeType="contained">
          Primary
        </Button>
        <Button theme="secondary" themeType="contained">
          Secondary
        </Button>
        <Button theme="warning" themeType="contained">
          Warning
        </Button>
        <Button theme="clear" themeType="contained">
          Clear
        </Button>
        <Button theme="disabled" themeType="contained">
          Disabled
        </Button>
        <Button theme="error" themeType="contained">
          Error
        </Button>
      </section>
      <section>
        <Typography type="headline-4">Flat</Typography>
        <Button theme="primary" themeType="flat">
          Primary
        </Button>
        <Button theme="secondary" themeType="flat">
          Secondary
        </Button>
        <Button theme="warning" themeType="flat">
          Warning
        </Button>
        <Button theme="clear" themeType="flat">
          Clear
        </Button>
        <Button theme="disabled" themeType="flat">
          Disabled
        </Button>
        <Button theme="error" themeType="flat">
          Error
        </Button>
      </section>
      <section>
        <Typography type="headline-4">Outline</Typography>
        <Button theme="primary" themeType="outline">
          Primary
        </Button>
        <Button theme="secondary" themeType="outline">
          Secondary
        </Button>
        <Button theme="warning" themeType="outline">
          Warning
        </Button>
        <Button theme="clear" themeType="outline">
          Clear
        </Button>
        <Button theme="disabled" themeType="outline">
          Disabled
        </Button>
        <Button theme="error" themeType="outline">
          Error
        </Button>
      </section>
    </section>
  );
};

export default App;
