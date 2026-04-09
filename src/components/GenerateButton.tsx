import { Pressable, StyleSheet, Text } from "react-native";

type GenerateButtonProps = {
  onPress: () => void;
};

export default function GenerateButton({ onPress }: GenerateButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>Gerar outra lapada</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  text: {
    color: "#111",
    fontSize: 16,
    fontWeight: "900",
  },
});
