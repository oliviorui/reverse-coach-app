import { Pressable, StyleSheet, Text, View } from "react-native";

type GenerateButtonProps = {
  onGenerate: () => void;
  onShare: () => void;
  onSave: () => void;
  onOpenFavorites: () => void;
  onEnableNotifications: () => void;
};

export default function GenerateButton({
  onGenerate,
  onShare,
  onSave,
  onOpenFavorites,
  onEnableNotifications,
}: GenerateButtonProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onSave}
        >
          <Text style={styles.secondaryText}>Guardar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onShare}
        >
          <Text style={styles.secondaryText}>Compartilhar</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onOpenFavorites}
        >
          <Text style={styles.secondaryText}>Favoritos</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onEnableNotifications}
        >
          <Text style={styles.secondaryText}>Notificações</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onGenerate}
      >
        <Text style={styles.primaryText}>Gerar outra</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  row: {
    width: "100%",
    flexDirection: "row",
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
    flex: 1,
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
