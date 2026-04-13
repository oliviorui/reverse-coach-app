import { Pressable, StyleSheet, Text, View } from "react-native";

type GenerateButtonProps = {
  onGenerate: () => void;
  onShare: () => void;
  onSave: () => void;
  onOpenFavorites: () => void;
  onEnableNotifications: () => void;
  onDaily: () => void;
  isDaily: boolean;
};

export default function GenerateButton({
  onGenerate,
  onShare,
  onSave,
  onOpenFavorites,
  onEnableNotifications,
  onDaily,
  isDaily,
}: GenerateButtonProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={onSave}>
          <Text style={styles.secondaryText}>Guardar</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onShare}>
          <Text style={styles.secondaryText}>Compartilhar</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={onOpenFavorites}>
          <Text style={styles.secondaryText}>Favoritos</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onDaily}>
          <Text style={styles.secondaryText}>Frase do dia</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable
          style={styles.secondaryButton}
          onPress={onEnableNotifications}
        >
          <Text style={styles.secondaryText}>Notificações</Text>
        </Pressable>

        <Pressable
          style={[
            styles.primaryButton,
            isDaily ? styles.primaryButtonDisabled : null,
          ]}
          onPress={isDaily ? undefined : onGenerate}
        >
          <Text style={styles.primaryText}>Gerar outra</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
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
