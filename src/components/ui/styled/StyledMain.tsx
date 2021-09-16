import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import { compose } from 'recompose';
import { drawerWidth } from '../../list/styled/StyledTodoList';


const StyledMain = styled('main')(({ theme }: WithTheme) => ({
  marginLeft: drawerWidth,
  padding: theme.spacing(2),
  marginTop: theme.spacing(8)
}));

export default compose<WithTheme, {}>(
  withTheme
)(StyledMain);
