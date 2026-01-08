import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    position: 'relative',
    background:
      'radial-gradient(58.52% 100% at 0% 0%, rgba(177, 252, 3, 0.47) 0%, rgba(177, 252, 3, 0.14) 100%)',
    backdropFilter: 'blur(4px)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '165%',
    fontFamily: 'var(--font-figtree), "Figtree", sans-serif',
    margin: 0,
    paddingRight: 16,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: '-0.14px',
    fontFamily: 'var(--font-figtree), "Figtree", sans-serif',
    margin: 0,
    '& a': {
      color: '#B1FC03',
      fontWeight: 500,
      textDecoration: 'underline',
      '&:hover': {
        opacity: 0.8,
      },
    },
    '& .highlight': {
      color: '#FFFFFF',
      fontWeight: 500,
    },
  },
  closeButton: {
    position: 'absolute',
    padding: 4,
    top: 12,
    right: 12,
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      opacity: 0.5,
    },
  },
}));

export default useStyles;
