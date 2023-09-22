import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7708",
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 100,
  },
  input: {
    width: "80%",
    height: 64,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#969CB2",
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  button: {
    width: "80%",
    height: 64,
    backgroundColor: "#FFAD6B",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,

    fontSize: 16,
  },
  logo: {
    width: 230,
    height: 150,
    marginBottom: 70,
  },
  checkboxContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkboxLabel: {
    color: THEME.COLORS.TEXT_WHITE,
    fontSize: 14,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  forgotPassword: {
    color: THEME.COLORS.TEXT_WHITE,
    fontSize: 14,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  signUpText: {
    color: THEME.COLORS.TEXT_WHITE,
    fontSize: 14,
    marginTop: 16,
  },
});
