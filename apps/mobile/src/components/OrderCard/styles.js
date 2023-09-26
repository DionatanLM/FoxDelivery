import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.TEXT_WHITE,
    borderRadius: 5,

    width: '100%',

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  header: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e2e2e2',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  textWhite: {
    color: THEME.COLORS.TEXT_WHITE,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: 15
  },
  textGray: {
    color: '#585858',
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: 12
  },
  textLightGray: {
    color: '#9D9D9D',
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: 12
  }
})
