import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    '& .status': {
      '&.one': {
        color: theme.palette.custom.tags.one,
      },
      '&.two': {
        color: theme.palette.custom.tags.two,
      },
      '&.three': {
        color: theme.palette.custom.tags.three,
      },
      '&.zero': {
        color: theme.palette.custom.tags.zero,
      },
    },
  },
  cell: {
    ...(theme.mixins.tableCell as CSSObject),
    '&.sort:hover': {
      cursor: 'pointer',
    },
  },
  flexCells: {
    '& > *': {
      display: 'flex',
      alignItems: 'center',
    },
    '&.right': {
      '& > *': {
        justifyContent: 'flex-end',
      },
    },
    '&.center': {
      '& > *': {
        justifyContent: 'center',
      },
    },
  },
  header: {
    background: theme.palette.custom.general.modal_header,
    color: `${theme.palette.custom.fonts.table_headers} !important`,
    fontSize: '12px !important',
    textTransform: 'uppercase',

    '.MuiTypography-h5': {
      fontSize: '12px',
    },
  },
  body: {
    color: theme.palette.custom.fonts.fontTwo,
  },
  statusTag: {
    '& .MuiTypography-body1': {
      lineHeight: 1,
    },
  },
  popoverWrapper: {
    '& .MuiPopover-paper': {
      background: theme.palette.custom.general.nav_drawer,
    },
  },
  popoverContent: {
    background: theme.palette.custom.general.nav_drawer,
    borderRadius: 4,
  },
}));

export default useStyles;
