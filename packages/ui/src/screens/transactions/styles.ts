import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  contentWrapper: {
    maxHeight: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    padding: `0 !important`,
    minHeight: '500px',
    height: '100%',
    overflow: 'hidden !important',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1),

    [theme.breakpoints.down(401)]: {
      '& > h1': {
        fontSize: '1.75rem',
      },
      '& > h4': {
        fontSize: '0.75rem',
      },
    },

    '& .MuiSwitch-root': {
      width: 36,
      height: 20,
      padding: 0,

      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: '#25D695',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 16,
        height: 16,
      },
      '& .MuiSwitch-track': {
        borderRadius: 13,
        backgroundColor: `#373E48`,
        opacity: 1,
        transition: theme.transitions.create(['all'], {
          duration: 200,
        }),
      },
    },
  },
  layoutRoot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(100vh - ${theme.spacing(8)})`,
    marginTop: theme.spacing(8),

    [theme.breakpoints.up('lg')]: {
      marginTop: 'unset',
      minHeight: '100vh',
    },
  },
  layoutContentWrapper: {
    display: 'flex',
    flex: 1,
    maxHeight: `calc(100vh - ${theme.spacing(10)})`,

    [theme.breakpoints.up('lg')]: {
      maxHeight: 'unset',
    },
  },
}));

export default useStyles;
