import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  listItemIcon: {
    minWidth: 0,
  },
  listItemText: {
    '&& *': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '21px',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiButtonBase-root': {
      padding: 0,
    },
    background: theme.palette.custom.general.modal_header,
  },
  title: {
    display: 'flex',
    alignItems: 'center',

    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.25),
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      width: '500px',
    },
  },
  formItem: {
    display: 'grid',
    gridTemplateColumns: '1fr 150px',
    placeItems: 'center start',
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      width: '100%',
      padding: 0,
    },
    '& .form-item--label': {
      color: theme.palette.custom.fonts.settings_label,
    },
    '& .theme_container': {
      display: 'grid',
      gridAutoFlow: 'column',
      background: theme.palette.custom.general.theme_selector_background,
      borderRadius: '10%',
      placeSelf: 'end',
      margin: theme.spacing(1.5, 0),
      padding: 2,

      '& .theme_item': {
        cursor: 'pointer',
        padding: 8,
        borderRadius: '10%',
        transition: 'background .2s',
        display: 'grid',
        placeItems: 'center',
        color: theme.palette.text.primary,

        svg: {
          width: 16,
          height: 16,
        },

        '&.active': {
          background: theme.palette.primary.main,
          svg: {
            color: theme.palette.primary.contrastText,
            fill: 'white',
          },
        },
      },
    },
  },
  version: {
    color: theme.palette.custom.fonts.settings_label_version,
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    fontSize: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

export default useStyles;
