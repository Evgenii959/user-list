import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#ffffff",
          primary: "#1976D2",
        },
      },
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          primary: "#90CAF9",
        },
      },
    },
    defaultTheme: "light",
  },
});
