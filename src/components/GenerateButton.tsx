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

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

function ActionButton({
  label,
  onPress,
  variant = "secondary",
  disabled = false,
}: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonBase,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        pressed && !disabled ? styles.buttonPressed : null,
        disabled ? styles.buttonDisabled : null,
      ]}
      onPress={disabled ? undefined : onPress}
    >
      <Text
        style={[
          styles.buttonText,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

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
      <View style={styles.actionsCard}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Ações</Text>
          <Text style={styles.sectionSubtitle}>
            {isDaily ? "Modo diário ativo" : "Modo aleatório ativo"}
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.row}>
            <ActionButton label="Guardar" onPress={onSave} />
            <ActionButton label="Compartilhar" onPress={onShare} />
          </View>

          <View style={styles.row}>
            <ActionButton label="Favoritos" onPress={onOpenFavorites} />
            <ActionButton label="Frase do dia" onPress={onDaily} />
          </View>

          <View style={styles.row}>
            <ActionButton
              label="Notificações"
              onPress={onEnableNotifications}
            />
            <ActionButton
              label={isDaily ? "Modo travado" : "Gerar outra"}
              onPress={onGenerate}
              variant="primary"
              disabled={isDaily}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  actionsCard: {
    width: "100%",
    borderRadius: 26,
    padding: 16,
    backgroundColor: "rgba(10,10,12,0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  headerRow: {
    marginBottom: 14,
    gap: 4,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    fontWeight: "600",
  },
  grid: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  buttonBase: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  primaryButton: {
    backgroundColor: "#ffffff",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.2,
  },
  primaryText: {
    color: "#111111",
  },
  secondaryText: {
    color: "#ffffff",
  },
});
