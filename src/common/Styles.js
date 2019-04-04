import { StyleSheet as ss, css as cx } from 'aphrodite'

// Non antd color struct
export const globalColors = {
  BACKGROUND_LIGHT: '#eaeaea',
  BLACK: '#000',
  WHITE: '#fff'
}

export const globalStyles = {
  backgroundLight: {
    background: globalColors.BACKGROUND_LIGHT
  },
  backgroundSecondary: {
    background: globalColors.BACKGROUND_SECONDARY
  },
  backgroundWhite: {
    background: globalColors.WHITE
  }
}

export const antdStyles = {
  gutter: 16
}

export const css = cx
export const StyleSheet = ss
