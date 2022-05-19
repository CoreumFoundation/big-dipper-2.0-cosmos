import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          ...theme.mixins.layout,
          display: 'grid',
          gridGap: theme.spacing(1),
          gridTemplateRows: 'auto auto 1fr',
          gridTemplateColumns: '1fr',
          '& a': {
            color: theme.palette.custom.fonts.highlight,
          },
          [theme.breakpoints.up('md')]: {
            gridGap: theme.spacing(2),
            paddingRight: theme.spacing(1),
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          [theme.breakpoints.up('lg')]: {
            gridGap: theme.spacing(2),
            gridTemplateColumns: 'repeat(3, 1fr)',
            paddingRight: theme.spacing(3),
          },
        },
        mainInfo: {
          [theme.breakpoints.up('md')]: {
            gridColumn: '1 / 3',
          },
          [theme.breakpoints.up('lg')]: {
            gridColumn: '1 / 3',
            // height: '400px', // if we can get the change feature
            height: '350px',
          },
        },
        dataBlocks: {
          [theme.breakpoints.up('md')]: {
            gridColumn: '1 / 2',
          },
          [theme.breakpoints.up('lg')]: {
            gridColumn: '3 / 4',
          },
        },
        hero: {
          [theme.breakpoints.up('md')]: {
            gridColumn: '2 / 3',
          },
          [theme.breakpoints.up('lg')]: {
            gridColumn: '1 / 2',
            // height: '400px', // if we can get the change feature
            height: '350px',
          },
        },
        tokenomics: {
          height: '375px',
          [theme.breakpoints.up('md')]: {
            gridColumn: '1/ 2',
          },
          [theme.breakpoints.up('lg')]: {
            gridColumn: '2 / 3',
            height: '100%',
          },
        },
        consensus: {
          height: '375px',
          [theme.breakpoints.up('md')]: {
            gridColumn: '2 / 3',
          },
          [theme.breakpoints.up('lg')]: {
            gridColumn: '3 / 4',
            height: '100%',
          },
        },
        bottom: {
          gridColumn: '1 / 4',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme.spacing(2),
          [theme.breakpoints.up('lg')]: {
            gridGap: theme.spacing(2),
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '& .blocks': {
            [theme.breakpoints.up('md')]: {
              gridColumn: '1',
            },
            [theme.breakpoints.up('lg')]: {
              gridColumn: '1',
            },
          },
          '& .transactions': {
            [theme.breakpoints.up('md')]: {
              gridColumn: '1',
            },
            [theme.breakpoints.up('lg')]: {
              gridColumn: '2',
            },
          },
        },
      });
    }, {
      index: 1,
    },
  )();

  return styles;
};
