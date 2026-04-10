import { Pressable, StyleSheet, Text, View } from "react-native";

type GenerateButtonProps = {
  onGenerate: () => void;
  onShare: () => void;
};

export default function GenerateButton({
  onGenerate,
  onShare,
}: GenerateButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onShare}
      >
        <Text style={styles.secondaryText}>Compartilhar lapada</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onGenerate}
      >
        <Text style={styles.primaryText}>Gerar outra lapada</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  primaryText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
