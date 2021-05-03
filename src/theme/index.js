import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F0F0F0',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#d1093a'
    },
    secondary: {
      main: '#ef3070'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
