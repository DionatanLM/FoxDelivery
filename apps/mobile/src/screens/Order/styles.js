import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 25,
    backgroundColor: '#E2E2E2',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  header: {
    backgroundColor: '#F58328'
  },
  headerText: {
    fontFamily: THEME.FONT_FAMILY_SEMI_BOLD
  },
  progressSteps: {
    margin: 0,
    padding: 0
  },
  buttonDelivery: {
    position: 'absolute',
    bottom: 90,
    right: 20,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  circleButton: {
    backgroundColor: '#F58328',
    borderRadius: 50,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80
  },
  containerButtonText: {
    backgroundColor: '#00000089',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 50
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: 13
  }
})
