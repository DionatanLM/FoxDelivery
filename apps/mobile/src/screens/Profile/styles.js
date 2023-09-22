import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#E2E2E2",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  header: {
    backgroundColor: "#F58328",
  },
  buttonLogout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    width: "100%",
    marginLeft: 24,
  },
  containerImgProfile: {
    position: "relative",
    width: 150,
  },
  buttonImg: {
    position: "absolute",
    backgroundColor: "#F58328",
    padding: 20,
    borderRadius: 100,

    bottom: 0,
    right: 0,
  },
  imageProfile: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
    color: "#585858",
  },
});
