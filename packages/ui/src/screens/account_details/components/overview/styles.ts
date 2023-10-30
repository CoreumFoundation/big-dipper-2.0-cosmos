import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
    },
  },
  rootDialog: {
    maxWidth: '100%',
  },
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 !important',
    minWidth: '400px',
    width: '100%',

    '& .modal-header': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.spacing(2.5),
      backgroundColor: '#1D222C',

      '& .close-btn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      },
    },
    '& .qrWrapper': {
      padding: theme.spacing(5),

      '& .qrWrapperContent': {
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),

        '& .MuiTypography-body1': {
          marginTop: theme.spacing(2),
          color: '#000',
        },
      },
    },
    '& .divider': {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      marginTop: '10px',

      '&-line': {
        height: '1px',
        background: '#23272E',
        width: '100%',
      },
      '&-text': {
        position: 'absolute',
        marginTop: `-10px`,
        backgroundColor: '#1B1D23',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        color: '#A5A8B2',
        fontSize: '14px',
      },
    },
    '& .dialog__share--wrapper': {
      width: '100%',
      padding: theme.spacing(3),

      '& .MuiTypography-body1': {
        fontWeight: 500,
        fontSize: '16px',
        marginBottom: theme.spacing(2),
      },
    },
  },
  actionIcons: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    '& svg': {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
    },
  },
  item: {
    padding: theme.spacing(2, 0),
    color: theme.palette.custom.fonts.fontTwo,
    '&:first-of-type': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
    '& .label': {
      marginBottom: theme.spacing(1),
    },
    '& .detail': {
      '&.MuiTypography-body1': {
        wordWrap: 'break-word',
      },
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
      '&:not(:last-child)': {
        borderBottom: 'none',
      },
      '& .label': {
        marginBottom: 0,
      },
    },
  },
  copyText: {
    '& .detail': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      '& svg': {
        width: '1rem',
        marginLeft: theme.spacing(1),
      },
    },
  },
}));

export default useStyles;
