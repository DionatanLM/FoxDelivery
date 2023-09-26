import { StyleSheet } from 'react-native'
import { THEME } from '../../../../theme'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  map: {
    height: 375,
    width: '111%',
    marginHorizontal: -20,

    position: 'absolute',
    top: 30
  },
  buttonMap: {
    position: 'absolute',
    backgroundColor: '#E6e6e6',
    padding: 10,
    top: 30,
    marginLeft: -20,
    borderBottomRightRadius: 10
  },
  buttonMapText: {
    fontSize: 10,
    color: '#979797',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  title: {
    fontSize: 20,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: '#585858'
  },
  subTitle: {
    fontSize: 20,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: '#585858'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',

    gap: 10
  },
  text: {
    fontSize: 16,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: '#9D9D9D',

    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  boldText: {
    fontSize: 16,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    color: '#585858'
  }
})
