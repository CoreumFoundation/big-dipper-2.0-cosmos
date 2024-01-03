import { useSettingList } from '@/components/nav/components/desktop/components/action_bar/components/settings_list/hooks';
import useStyles from '@/components/nav/components/desktop/components/action_bar/components/settings_list/styles';
import { TX_LIST } from '@/recoil/settings';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import SettingIcon from 'shared-utils/assets/icon_settings.svg';
import generalConfig from '@/generalConfig';

const Settings: FC<ComponentDefault> = (props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const { open, handleOpen, state, handleChange, handleFormSubmit, handleCancel } = useSettingList({
    lang: i18n.language,
  });

  return (
    <div>
      <ListItemButton className={props.className} onClick={handleOpen}>
        <ListItemIcon className={classes.listItemIcon}>
          <div role="button" className={classes.icon}>
            <SettingIcon style={{ color: 'none' }} />
          </div>
        </ListItemIcon>
        <ListItemText className={classes.listItemText} primary={t('settings')} />
      </ListItemButton>
      <Dialog maxWidth="md" onClose={handleCancel} open={open} className={classes.dialog}>
        <DialogTitle className={classes.header}>
          <div className={classes.title}>
            <Typography variant="h2">{t('settings')}</Typography>
          </div>
          <IconButton aria-label="close" onClick={handleCancel} size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <div className={classes.formItem}>
              <Typography className="form-item--label">{t('theme')}</Typography>
              <div className="theme_container">
                {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                <div
                  className={`theme_item ${state.theme === 'dark' ? 'active' : ''}`}
                  role="button"
                  onClick={() => handleChange('theme', 'dark')}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.02405 0C6.75144 0.878125 7.18779 1.99388 7.18779 3.209C7.18779 6.03775 4.82893 8.33113 1.91849 8.33113C1.35777 8.33113 0.817505 8.24512 0.310547 8.08737C1.27624 9.25312 2.75609 10 4.41611 10C7.3263 10 9.68555 7.70675 9.68555 4.878C9.68542 2.5945 8.14757 0.66075 6.02405 0Z"
                      fill={state.theme !== 'dark' ? '#C3C3C3' : '#FFFFFF'}
                    />
                  </svg>
                </div>
                {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                <div
                  className={`theme_item ${state.theme === 'light' ? 'active' : ''}`}
                  role="button"
                  onClick={() => handleChange('theme', 'light')}
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.00082 0L7.12317 2.20813L9.42169 1.20621L8.69809 3.66613L11.2419 4.26025L8.90112 5.65087L10.6097 7.73316L7.89379 7.34094L7.821 10L6.00082 8.00835L4.18064 10L4.10772 7.34094L1.39197 7.73316L3.0623 5.65087L0.759766 4.26025L3.30857 3.65545L2.57995 1.20621L4.88399 2.20561L6.00082 0V0ZM7.21293 7.09932C6.05349 7.76874 4.57085 7.37149 3.90156 6.21218C3.23214 5.05274 3.62939 3.57009 4.7887 2.9008C5.94815 2.23138 7.43079 2.62863 8.10008 3.78795C8.7695 4.94739 8.37225 6.43004 7.21293 7.09932Z"
                      fill={state.theme === 'dark' ? '#C3C3C3' : '#FFFFFF'}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className={classes.formItem}>
              <Typography className="form-item--label">{t('language')}</Typography>
              <Select
                variant="outlined"
                value={state.lang}
                onChange={(e) => handleChange('lang', (e?.target?.value as string) ?? '')}
                MenuProps={{
                  MenuListProps: {
                    disablePadding: true,
                  },
                }}
              >
                {router.locales?.map((l) => (
                  <MenuItem key={l} value={l}>
                    {t(l)}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* <div className={classes.formItem}>
              <Typography className="form-item--label">{t('dateFormat')}</Typography>
              <Select
                variant="outlined"
                value={state.dateFormat}
                onChange={(e) => handleChange('dateFormat', (e?.target?.value as string) ?? '')}
                MenuProps={{
                  MenuListProps: {
                    disablePadding: true,
                  },
                }}
              >
                {DATE_LIST.map((l) => (
                  <MenuItem key={l} value={l}>
                    {t(l)}
                  </MenuItem>
                ))}
              </Select>
            </div> */}

            <div className={classes.formItem}>
              <Typography className="form-item--label">{t('txListFormat')}</Typography>
              <Select
                variant="outlined"
                value={state.txListFormat}
                onChange={(e) => handleChange('txListFormat', (e?.target?.value as string) ?? '')}
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
            justifyContent: 'space-between',
            paddingLeft: '24px',
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
