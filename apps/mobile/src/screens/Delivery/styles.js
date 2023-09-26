import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: '#E2E2E2'
  },
  cardDelivery: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: '210%',
    padding: 20,
    marginVertical: 25,
    borderRadius: 5,

    display: 'flex',
    alignItems: 'center'
  },
  cardDeliveryCentered: {
    justifyContent: 'center'
  },
  image: {
    width: 90,
    height: 90
  },
  title: {
    color: '#585858',
    fontFamily: THEME.FONT_FAMILY.BOLD,

    fontSize: 20
  },
  subTitle: {
    color: '#9C98A6',
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    fontSize: 16,
    textAlign: 'center'
  },
  dialog: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: 270,
    height: 180,

    backgroundColor: '#FFFFFF',
    borderRadius: 10
  },
  dialogHeader: {
    backgroundColor: '#F58328',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogHeaderText: {
    fontSize: 15,
    color: THEME.COLORS.TEXT_WHITE,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD
  },
  dialogBody: {
    marginVertical: 16
  },
  dialogBodyText: {
    color: '#585858',
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 32,
    textAlign: 'center'
  },
  dialogBodyDescription: {
    color: '#585858',
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 14,
    textAlign: 'center'
  },
  dialogFooter: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  dialogFooterText: {
    color: '#9c98a6bd',
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 14,
    width: 100,
    textAlign: 'center'
  },
  buttonDialog: {
    position: 'absolute',
    width: 67,
    height: 67,
    borderRadius: 100,
    backgroundColor: '#F58328',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -10
  },
  buttonGray: {
    backgroundColor: '#656565'
  },
  buttonAccept: {
    left: -20
  },
  buttonCancel: {
    right: -20
  }
})
