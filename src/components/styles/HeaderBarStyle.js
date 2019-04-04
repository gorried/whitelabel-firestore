import { StyleSheet } from 'aphrodite'
import { globalStyles, globalColors } from 'common/Styles'

export default StyleSheet.create({
  ...globalStyles,
  navText: {
    letterSpacing: 3
  },
  navHeader: {
    backgroundColor: globalColors.WHITE
  }
})
