declare module 'next-themes' {
  export interface UseThemeProps {
    themes?: string[]
    forcedTheme?: string
    setTheme: (theme: string) => void
    theme?: string
    resolvedTheme?: string
    systemTheme?: 'dark' | 'light'
  }

  export function useTheme(): UseThemeProps
  export function ThemeProvider(props: {
    children: React.ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    storageKey?: string
    themes?: string[]
    forcedTheme?: string
    enableColorScheme?: boolean
    disableTransitionOnChange?: boolean
  }): JSX.Element
}
