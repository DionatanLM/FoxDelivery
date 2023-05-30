import { View, ActivityIndicator } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY} />
    </View>
  );
}
