import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTranslation } from 'next-i18next';
import { ComponentProps, FC } from 'react';
import useStyles from '@/screens/validators/components/list/components/tabs/styles';
import { tabLabels } from '@/screens/validators/components/list/components/tabs/utils';
import { a11yProps } from '@/utils/a11yProps';

type TabsHeaderProps = {
  className?: string;
  tab: number;
  handleTabChange: ComponentProps<typeof Tabs>['onChange'];
};

const TabsHeader: FC<TabsHeaderProps> = ({ className, tab, handleTabChange }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation('validators');

  return (
    <div className={cx(classes.root, className)}>
      <Tabs variant="scrollable" scrollButtons={false} value={tab} onChange={handleTabChange}>
        {tabLabels.map((x, i) => (
          <Tab key={x} label={t(x)} {...a11yProps(i)} />
        ))}
      </Tabs>
    </div>
  );
};

export default TabsHeader;
