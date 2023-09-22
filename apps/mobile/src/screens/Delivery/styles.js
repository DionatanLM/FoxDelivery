import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: "#E2E2E2",
  },
  cardDelivery: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: "210%",
    padding: 20,
    marginVertical: 25,
    borderRadius: 5,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  title: {
    color: "#585858",
    fontFamily: THEME.FONT_FAMILY.BOLD,

    fontSize: 20,
  },
  subTitle: {
    color: "#9C98A6",
    fontFamily: THEME.FONT_FAMILY.REGULAR,

    fontSize: 16,
    textAlign: "center",
  },
});
