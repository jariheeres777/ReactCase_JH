import { Typography } from "@material-ui/core";
import * as React from 'react';
import StyledMain from "./styled/StyledMain";

const Main = () => {
  return (
    <StyledMain>
      <Typography paragraph>
        Todo's should come here
      </Typography>
    </StyledMain>
  );
};

export default Main;