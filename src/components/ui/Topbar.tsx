import { Typography } from "@material-ui/core";
import * as React from 'react';
import StyledAppbar from "./styled/StyledAppbar";
import StyledToolbar from "./styled/StyledToolbar";

const Topbar = () => {
  return (
    <StyledAppbar position="fixed">
      <StyledToolbar>
        <Typography variant="h6" noWrap>
          Todo app
        </Typography>
      </StyledToolbar>
    </StyledAppbar>
  );
};

export default Topbar;