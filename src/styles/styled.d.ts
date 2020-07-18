import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,
    colors: {
      primary: string,
      secundary: string,
      background: string,
      text: string,
      textSecundary: string,

      card_bg_primary: string,
      card_bg_secondary: string,
      card_border_primary: string,

      transactions_bg: string,
      transactions_title: string,
      transactions_income: string,
      transactions_outcome: string,
    }
  }
}
