import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: "#E2E2E2",
  },
  backgroundOrange: {
    width: "120%",
    height: 550,
    backgroundColor: "#F58328",
    position: "absolute",
    marginLeft: -25,
    marginTop: -350,
  },

  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 60,
    marginBottom: -25,
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
});
