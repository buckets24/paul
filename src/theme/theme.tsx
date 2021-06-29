import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { Breadcrumb } from './component-styles/breadcrumbStyles';
import { Form } from './component-styles/formFieldStyles';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  styles: {
    global: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      'html, body, #__next': {
        h: '100%',
        backgroundColor: 'brand.primary.100',
      },
      '*::-webkit-scrollbar': {
        w: '5px',
        h: '5px',
      },
      '*::-webkit-scrollbar-track': {
        h: '100%',
        bg: 'gray.300',
        borderRadius: '2px',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: 'gray.600',
        borderRadius: '2px',
      },
      body: {
        // w: '100vw', // This is the scroll jump fix on windows
        w: '100%',
        overflowX: 'hidden',
        fontFamily: 'body',
        color: 'gray.900',
      },
      /**
       * Unusual way for chakra-ui but I checked the code for `radio.tsx` in chakra-ui's repo,
       * there is no way to pass a property to the wrapping component of the Radio component.
       */
      '.chakra-radio': {
        alignItems: 'baseline !important',
      },
      '.no-page-break': {
        pageBreakInside: 'avoid',
      },
      '.page-break': {
        pageBreakAfter: 'always',
      },
    },
  },
  colors: {
    black: '#000000',
    gray: {
      900: '#1A1A1A',
      800: '#656565',
      400: '#C7C7C7',
      200: '#E4E4E4',
      100: '#F1F1F1',
    },
    white: {
      72: 'rgba(255, 255, 255, 0.72)',
      40: 'rgba(255, 255, 255, 0.4)',
    },
    brand: {
      bodyBackground: '',
      textColor: '',
      primary: {
        900: '#060E22',
        800: '#121C34',
        700: '#2648A4',
        600: '#2C5DE5',
        500: '#91ADFA',
        400: '#BFD0FD',
        300: '#D7E1FE',
        200: '#F4F8FF',
        100: '#F9FAFB',
      },
    },
    support: {
      success: {
        700: '#086343',
        500: '#008556',
        100: '#D6F3E2',
      },
      warning: {
        700: '#A64F21',
        500: '#E86825',
        100: '#FFE1BE',
      },
      alert: {
        700: '#9F1B1F',
        500: '#DE1C22',
        100: '#F9D3D4',
      },
    },
  },
  fontSizes: {
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    md: '0.875rem', // 14px
    lg: '1rem', // 16px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    '4xl': '2.5rem', // 40px
    '5xl': '3rem', // 48px
    '6xl': '3.5rem', // 56px
  },
  fonts: {
    heading:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  components: {
    Form,
    Breadcrumb,
  },
  breakpoints,
});

export default theme;
