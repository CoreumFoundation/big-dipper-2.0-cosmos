import { i18n } from 'next-i18next';
import { useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { THEME_DICTIONARY, writeTheme, writeTx } from '@/recoil/settings';
import type { Theme, Tx } from '@/recoil/settings';

export const useSettingList = () => {
  const [theme, setTheme] = useRecoilState(writeTheme) as [Theme, SetterOrUpdater<Theme>];
  const [tx, setTx] = useRecoilState(writeTx) as [Tx, SetterOrUpdater<Tx>];

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTheme = (value: Theme) => {
    if (THEME_DICTIONARY[value]) {
      setTheme(value);
    }
  };

  const handleChangeLanguage = (value: string) => {
    i18n?.changeLanguage(value);
  };

  // Custom method that allows for changing state from tx page
  const updateTxFormat = () => {
    setTx(tx === 'compact' ? 'detailed' : 'compact');
  };

  return {
    open,
    handleOpen,
    handleClose,
    changeTheme,
    updateTxFormat,
    handleChangeLanguage,
    theme,
    txListFormat: tx,
  };
};
