import useStyles from '@/screens/wasmContracts/styles';
import { columnsCode } from '@/screens/wasmContracts/utils';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'next-i18next';

const CodeHeaderDesktop = () => {
  const { t } = useTranslation('wasm_contracts');
  const { classes } = useStyles();
  return (
    <Grid2 container className={classes.header} columnGap={1}>
      {columnsCode.map((col) => (
        <Grid2
          key={col.columnKey}
          xs={col.width}
          justifyContent={col.justifyContent}
          textAlign={col.textAlign}
        >
          {t(col.columnKey)}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CodeHeaderDesktop;
