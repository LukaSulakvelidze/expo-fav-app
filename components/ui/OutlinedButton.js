import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
export default function OutlinedButton({
  onPress,
  isRemoveButton = false,
  icon = "help-circle-outline",
  children,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isRemoveButton && styles.removeButton,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} color={Colors.primary500} />
      <Text
        style={[
          isRemoveButton ? [styles.text, styles.removeText] : styles.text,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  removeButton: {
    borderColor: "red",
  },

  pressed: {
    opacity: 0.7,
  },
  icon: { marginRight: 6 },
  text: { color: Colors.primary500 },
  removeText: { color: "red" },
});
