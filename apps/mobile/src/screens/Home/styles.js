import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#E2E2E2",
    zIndex: 2,
  },
  padding: {
    padding: 25,
  },

  backgroundOrange: {
    width: "150%",
    height: 550,
    backgroundColor: "#F58328",
    position: "absolute",
    marginLeft: -25,
    marginTop: -360,
  },

  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileText: {
    color: "#fff",
    fontFamily: THEME.FONT_FAMILY.BOLD,

    fontSize: 16,
  },
  activity: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 5,
    marginTop: 25,
    minHeight: 200,
  },
  activityAlt: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F0F2F5",
    padding: 20,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 100,
    minHeight: 200,
  },
  activityTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityTitle: {
    color: "#585858",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 20,
    marginBottom: 10,
  },
  tabStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6E6E6",
    //marginBottom: 5,
    height: 30,
    gap: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  activityBalanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingRight: 10,

    position: "relative",
  },
  balanceTitle: {
    color: "#585858",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 32,
  },
  balanceSubTitle: {
    color: "#929292",
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    fontSize: 15,
    position: "absolute",
    top: -15,
  },
  divider: {
    marginHorizontal: -20,
    marginVertical: 10,
  },
  routesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  routesTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  routesTitle: {
    color: "#929292",
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    fontSize: 15,
  },
  routesSubTitle: {
    color: "#585858",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 20,
  },
  deliveryCard: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 5,
    gap: 5,

    marginVertical: 5,
  },
  deliveryCardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deliveryText: {
    color: "#929292",
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    fontSize: 13,
  },
  deliveryPrice: {
    color: "#929292",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 13,
  },
  deliveryHistory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  deliveryHistoryTotal: {
    color: "#929292",
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    fontSize: 13,
  },
});
