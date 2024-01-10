import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    display: 'grid',
    gridTemplateRows: 'auto',
    gap: theme.spacing(1.5),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  header: {
    paddingLeft: theme.spacing(2),
    fontSize: theme.spacing(3.5),
  },
}));

export default useStyles;
