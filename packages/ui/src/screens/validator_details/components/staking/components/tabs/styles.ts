import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.MuiTabs-indicator': {
      display: 'none',
    },

    '.MuiTab-root': {
      color: theme.palette.custom.fonts.staking_tab,
      fontWeight: 400,
      fontSize: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderRight: `1px solid ${theme.palette.custom.general.border_color}`,

      '&:last-child': {
        borderRight: 'none',
      },

      '&.Mui-selected': {
        color: theme.palette.custom.fonts.active_tab,
        borderColor: theme.palette.custom.general.border_color,
        fontWeight: 600,
        fontSize: theme.spacing(2.5),

        '& span': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  searchBar: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      width: '300px',
      '& .MuiInputBase-root': {
        width: '100%',
        background: theme.palette.custom.general.surfaceTwo,
        padding: theme.spacing(0.4, 1.2),
        borderRadius: theme.shape.borderRadius,
      },
      '& .MuiInputBase-input': {
        textOverflow: 'ellipsis',
        '&::placeholder': {
          color: theme.palette.custom.fonts.fontThree,
        },
      },
    },
  },
  label: {
    display: 'flex',
    gap: 8,
  },
}));

export default useStyles;
