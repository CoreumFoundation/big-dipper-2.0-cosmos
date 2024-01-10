import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTranslation } from 'next-i18next';
import { ComponentProps, FC } from 'react';
import useStyles from '@/screens/assets/components/list/components/tabs/styles';
import { tabLabels } from '@/screens/assets/components/list/components/tabs/utils';
import { a11yProps } from '@/utils/a11yProps';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

type TabsHeaderProps = {
  className?: string;
  tab: number;
  handleTabChange: ComponentProps<typeof Tabs>['onChange'];
};

const TabsHeader: FC<TabsHeaderProps> = ({ className, tab, handleTabChange }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('assets');

  return (
    <div className={cx(classes.root, className)}>
      <Tabs variant="scrollable" scrollButtons={false} value={tab} onChange={handleTabChange}>
        {tabLabels.map((x, i) => {
          if (x === 'nonFungibleToken') {
            return (
              <Tooltip
                TransitionComponent={Zoom}
                title={<p>{t('commingSoon')}</p>}
                placement="top"
                arrow
              >
                <Tab key={x} label={t(x)} {...a11yProps(i)} />
              </Tooltip>
            );
          }

          return <Tab key={x} label={t(x)} {...a11yProps(i)} />;
        })}
      </Tabs>
    </div>
  );
};

export default TabsHeader;
