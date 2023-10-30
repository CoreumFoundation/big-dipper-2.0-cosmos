import MenuItems from '@/components/nav/components/menu_items';
import {
  useLanguageDrawer,
  useThemeDrawer,
} from '@/components/nav/components/mobile/components/menu/hooks';
import useStyles from '@/components/nav/components/mobile/components/menu/styles';
import type { MenuProps } from '@/components/nav/components/mobile/components/menu/types';
import { THEME_LIST } from '@/recoil/settings';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from '@/components/nav/components/search_bar';

const Menu = (props: MenuProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  const { toggleNavMenus, className } = props;

  const { classes, cx } = useStyles();
  const languageOptions = useLanguageDrawer(i18n.language, toggleNavMenus);

  const themeOptions = useThemeDrawer(toggleNavMenus);
  return (
    <>
      {/* ================================== */}
      {/* Lang Drawer */}
      {/* ================================== */}
      <Drawer
        anchor="bottom"
        open={languageOptions.drawerOpen}
        onClose={languageOptions.toggleDrawer}
        className={cx(classes.drawer, 'lang-drawer')}
        aria-label="lang-drawer"
      >
        <div className="content">
          {router.locales
            ?.filter((l) => l !== i18n.language)
            .map((l) => (
              <div key={l}>
                <Link
                  shallow
                  href={{
                    pathname: router.pathname,
                    query: router.query,
                  }}
                  locale={l}
                  passHref
                >
                  <MenuItem component="a">{t(l)}</MenuItem>
                </Link>
              </div>
            ))}
        </div>
      </Drawer>
      {/* ================================== */}
      {/* Theme Drawer */}
      {/* ================================== */}
      <Drawer
        anchor="bottom"
        open={themeOptions.drawerOpen}
        onClose={themeOptions.toggleDrawer}
        className={classes.drawer}
      >
        <div className="content">
          {THEME_LIST.filter((l) => l !== themeOptions.theme).map((l) => (
            <div key={l}>
              <MenuItem component="a" onClick={() => themeOptions.handleThemeChange(l)}>
                {t(l)}
              </MenuItem>
            </div>
          ))}
        </div>
      </Drawer>
      {/* ================================== */}
      {/* Main Content */}
      {/* ================================== */}
      <div className={cx(classes.root, className)}>
        <SearchBar className="searchBar" />
        <div className={classes.menu}>
          <MenuItems />
        </div>
      </div>
    </>
  );
};

export default Menu;
