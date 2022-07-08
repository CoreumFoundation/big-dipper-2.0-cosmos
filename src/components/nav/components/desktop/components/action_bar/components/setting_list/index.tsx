import React from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import SettingIcon from '@assets/icon-setting.svg';
import { generalConfig } from '@configs';
import {
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Select,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Close as CloseIcon,
  Brightness2 as Dark,
  Brightness7 as Light,
} from '@material-ui/icons';
import {
  readTx, TX_LIST,
} from '@recoil/settings';
import { useRecoilValue } from 'recoil';
import { useSettingList } from './hooks';
import { useStyles } from './styles';

const Settings: React.FC<{
  className?: string;
}> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const txListFormat = useRecoilValue(readTx);
  const {
    t, lang,
  } = useTranslation('common');
  const {
    open,
    handleOpen,
    state,
    handleChange,
    handleFormSubmit,
    handleCancel,
  } = useSettingList({ lang });

  return (
    <div>
      <ListItem button className={props.className} onClick={handleOpen}>
        <ListItemIcon>
          <div role="button" className={classes.icon}>
            <SettingIcon />
          </div>
        </ListItemIcon>
        <ListItemText primary={t('settings')} />
      </ListItem>
      <Dialog
        maxWidth="md"
        onClose={handleCancel}
        open={open}
        className={classes.dialog}
      >
        <DialogTitle disableTypography className={classes.header}>
          <div className={classes.title}>
            <Typography variant="h2">{t('settings')}</Typography>
          </div>
          <IconButton aria-label="close" onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <div className={classes.formItem}>
              <Typography className="form-item--label">{t('theme')}</Typography>
              <div className="theme_container">
                <div
                  className={`theme_item ${
                    state.theme === 'dark' ? 'active' : ''
                  }`}
                  role="button"
                  onClick={() => handleChange('theme', 'dark')}
                >
                  <Dark htmlColor={state.theme === 'dark' ? 'white' : undefined} />
                </div>
                <div
                  className={`theme_item ${
                    state.theme === 'light' ? 'active' : ''
                  }`}
                  role="button"
                  onClick={() => handleChange('theme', 'light')}
                >
                  <Light htmlColor={state.theme === 'light' ? 'white' : undefined} />
                </div>
              </div>
            </div>

            <div className={classes.formItem}>
              <Typography className="form-item--label">
                {t('language')}
              </Typography>
              <Select
                variant="outlined"
                value={state.lang}
                onChange={(e) => handleChange('lang', e?.target?.value)}
                MenuProps={{
                  MenuListProps: {
                    disablePadding: true,
                  },
                }}
              >
                {router.locales.map((l) => (
                  <MenuItem key={l} value={l}>
                    {t(l)}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className={classes.formItem}>
              <Typography className="form-item--label">
                {t('txListFormat')}
              </Typography>
              <Select
                variant="outlined"
                value={txListFormat}
                onChange={(e) => handleChange('txListFormat', e?.target?.value)}
                MenuProps={{
                  MenuListProps: {
                    disablePadding: true,
                  },
                }}
              >
                {TX_LIST.map((l) => (
                  <MenuItem key={l} value={l}>
                    {t(l)}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </form>
        </DialogContent>
        <div />
        <DialogActions
          style={{
            justifyContent: 'space-between', paddingLeft: '24px',
          }}
        >
          <Typography variant="body2" className={classes.version}>
            {t('version')}
            {generalConfig.version}
          </Typography>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
