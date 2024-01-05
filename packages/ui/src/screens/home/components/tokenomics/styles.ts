import Color from 'color';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTypography-h2': {
      fontSize: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .data__item': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(0.5),

      '& .data__item-label': {
        display: 'flex',
        gap: theme.spacing(0.75),

        '& h4': {
          display: 'flex',
          flexDirection: 'row',
          color: theme.palette.custom.fonts.fontThree,
          fontSize: theme.spacing(1.75),
        },
      },

      '& h4': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        fontSize: theme.spacing(2),
        fontWeight: 600,

        '& span': {
          fontSize: theme.spacing(1.5),
          fontWeight: 500,
        },
      },

      '& .MuiTypography-caption': {
        color: theme.palette.custom.fonts.fontThree,
      },

      '& .circle': {
        width: theme.spacing(2),
        height: theme.spacing(2),
        borderRadius: theme.spacing(1),
      },
    },
  },
  legends: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    '& .MuiTypography-caption': {
      color: theme.palette.custom.fonts.fontThree,
    },
    '& .legends__item': {
      width: '50%',
      '&:before': {
        content: '""',
        display: 'inline-block',
        width: '12px',
        height: '12px',
        marginRight: '5px',
      },
      '&:first-of-type:before': {
        background: theme.palette.custom.tokenomics.one,
      },
      '&:nth-of-type(2):before': {
        background: theme.palette.custom.tokenomics.two,
      },
      '&:last-child:before': {
        background: theme.palette.custom.tokenomics.three,
      },
      '& .caption__percent': {
        color: theme.palette.custom.fonts.fontThree,
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  circleOut: {
    background: Color('#5E6773').alpha(0.25).toString(),
    padding: theme.spacing(1),
    borderRadius: '50%',
  },
  circleIn: {
    background: Color('#5E6773').alpha(0.25).toString(),
    borderRadius: '50%',
  },
}));

export default useStyles;
