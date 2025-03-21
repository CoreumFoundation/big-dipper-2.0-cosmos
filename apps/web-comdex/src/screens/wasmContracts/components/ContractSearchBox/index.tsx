import useStyles from '@/screens/wasmContracts/styles';
import { ContractSearchBoxProps } from '@/screens/wasmContracts/types';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

const ContractSearchBox: FC<ContractSearchBoxProps> = ({ searchText, handleChange }) => {
  const { t } = useTranslation('wasm_contracts');
  const { classes } = useStyles();
  return (
    <TextField
      className={classes.textfield}
      value={searchText}
      onChange={handleChange}
      type="search"
      placeholder={t('Search by contract name') ?? undefined}
      InputProps={{ startAdornment: <SearchIcon /> }}
    />
  );
};

export default ContractSearchBox;
