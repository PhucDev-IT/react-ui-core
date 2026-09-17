import React, { createContext, useContext, useEffect, useMemo } from 'react';

export type UiMode = 'light' | 'dark' | 'system';
export type UiDensity = 'compact' | 'comfortable' | 'spacious';
export type UiRadius = 'square' | 'soft' | 'rounded' | 'pill';
export type UiFontSize = 'small' | 'normal' | 'large';
export type UiContentWidth = 'boxed' | 'wide' | 'fluid';

export interface UiThemeConfig {
  mode?: UiMode;
  density?: UiDensity;
  radius?: UiRadius;
  fontSize?: UiFontSize;
  fontFamily?: string;
  primary?: string;
  contentWidth?: UiContentWidth;
}

const defaults: Required<UiThemeConfig> = {
  mode: 'light', density: 'comfortable', radius: 'soft', fontSize: 'normal', contentWidth:'wide',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  primary: '#206bc4'
};

const ThemeContext = createContext<Required<UiThemeConfig>>(defaults);

export function ThemeProvider({ value, children }: { value?: UiThemeConfig; children: React.ReactNode }) {
  const theme = useMemo(() => ({ ...defaults, ...value }), [value]);
  useEffect(() => {
    const el = document.documentElement;
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme.mode === 'dark' || (theme.mode === 'system' && media.matches);
      el.dataset.uiMode = dark ? 'dark' : 'light';
    };
    apply();
    if(theme.mode==='system') media.addEventListener?.('change',apply);
    el.dataset.uiDensity = theme.density;
    el.dataset.uiRadius = theme.radius;
    el.dataset.uiFontSize = theme.fontSize;
    el.dataset.uiContentWidth = theme.contentWidth;
    el.style.setProperty('--ui-font-family', theme.fontFamily);
    el.style.setProperty('--ui-primary', theme.primary);
    return ()=>media.removeEventListener?.('change',apply);
  }, [theme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
