import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import useStyles from '@/screens/validators/components/list/components/voting_power_explanation/styles';

const VotingPowerExplanation = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Typography>
        <Trans i18nKey="validators:votingPowerExplanation" components={[<b />]} />
      </Typography>
    </div>
  );
};

export default VotingPowerExplanation;
