import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { EntriesProvider } from '../context/entries'
import { UIProvider } from '../context/ui'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from '../themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}

export default MyApp
