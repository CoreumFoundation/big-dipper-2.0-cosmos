/* eslint-disable */
import type { Custom, PaletteOptions, Palette } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Custom {
    general: {
      background: string;
      surfaceOne: string;
      surfaceTwo: string;
      icon: string;
      single_block: string;
      nav_drawer: string;
      modal_net_selector: string;
      modal_header: string;
      search: string;
      net_selector: string;
      modal_background: string;
      theme_selector_background: string;
      border_color: string;
    };
    fonts: {
      fontOne: string;
      fontTwo: string;
      fontThree: string;
      fontFour: string;
      fontFive: string;
      highlight: string;
      netSelector_label: string;
      settings_label: string;
      netSelector_link: string;
      table_headers: string;
      data_blocks: string;
      staking_tab: string;
      active_tab: string;
      settings_label_version: string;
    };
    primaryData: {
      one: string;
      two: string;
      three: string;
      four: string;
    };
    tags: {
      zero: string;
      one: string;
      two: string;
      three: string;
      four: string;
      five: string;
      six: string;
      seven: string;
      eight: string;
      nine: string;
      ten: string;
      eleven: string;
      twelve: string;
      thirteen: string;
      fourteen: string;
      fifteen: string;
      sixteen: string;
      seventeen: string;
      eighteen: string;
      nineteen: string;
      twenty: string;
    };
    tags_bg: {
      zero: string;
      one: string;
      two: string;
      three: string;
      four: string;
      five: string;
      six: string;
      seven: string;
      eight: string;
      nine: string;
      ten: string;
      eleven: string;
      twelve: string;
      thirteen: string;
      fourteen: string;
      fifteen: string;
      sixteen: string;
      seventeen: string;
      eighteen: string;
      nineteen: string;
      twenty: string;
    };
    charts: {
      zero: string;
      one: string;
      two: string;
      three: string;
      four: string;
      five: string;
    };
    condition: {
      zero: string;
      one: string;
      two: string;
      three: string;
    };
    tokenomics: {
      zero: string;
      one: string;
      two: string;
      three: string;
    };
    results: {
      pass: string;
      fail: string;
    };
  }

  interface PaletteOptions {
    custom?: Custom;
  }
  interface Palette {
    custom: Custom;
  }
}
