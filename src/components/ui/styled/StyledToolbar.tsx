import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import { compose } from 'recompose';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { drawerWidth } from '../../list/styled/StyledTodoList';


const StyledToolbar = styled(Toolbar)(({ theme }: WithTheme) => ({
  marginLeft: drawerWidth,
  padding: 0
}));

export default compose<WithTheme, ToolbarProps>(
  withTheme
)(StyledToolbar);
