import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import { compose } from 'recompose';
import { drawerWidth } from '../../list/styled/StyledTodoList';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';


const StyledAppbar = styled(AppBar)(({ theme }: WithTheme) => ({
  width: 'calc(100% - 24px)',
  marginLeft: drawerWidth
}));

export default compose<WithTheme, AppBarProps>(
  withTheme
)(StyledAppbar);
