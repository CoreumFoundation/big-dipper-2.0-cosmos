import { CSSObject } from '@emotion/react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    ...(theme.mixins.layout as CSSObject),
    '& a': {
      color: theme.palette.custom.fonts.highlight,
    },
  },
  content: {
    height: 'auto',
    overflow: 'unset !important',
    padding: '0 !important',
  },
}));

export default useStyles;
