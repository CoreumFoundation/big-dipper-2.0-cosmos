import { makeStyles } from 'tss-react/mui';
import Color from 'color';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '18px',
    width: '18px',
  },
  svg: {
    position: 'absolute',
    width: '14px',
    height: '14px',
    right: 0,
    fill: Color(theme.palette.custom.fonts.fontThree).alpha(0.2).string(),
  },
  up: {
    transform: 'rotate(180deg)',
    '&.desc': {
      fill: theme.palette.custom.fonts.fontTwo,
    },
  },
  down: {
    '&.asc': {
      fill: theme.palette.custom.fonts.fontTwo,
    },
  },
}));

export default useStyles;
