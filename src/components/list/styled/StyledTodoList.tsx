import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import { compose } from 'recompose';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';

export const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }: WithTheme) => ({
  width: drawerWidth,
  '.list-item': {
    height: 64
  },
  '.drawer-paper': {
    width: drawerWidth
  }, 'active':{
    background: '#808080'
  }
}));

export default compose<WithTheme, DrawerProps>(
  withTheme
)(StyledDrawer);
