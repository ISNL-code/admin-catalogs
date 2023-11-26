import CustomPalette from '@/theme/interfaces/customPalette';

declare module '@mui/material/styles' {
  interface Theme {
    customPalette: CustomPalette;
  }
  interface ThemeOptions {
    customPalette: CustomPalette;
  }
}
