import { StyleSheet, Text, View } from "react-native";

type ProgressBarProps = {
  progress: number;
  percentage: number;
  year: number;
};

export default function ProgressBar({
  progress,
  percentage,
  year,
}: ProgressBarProps) {
  const widthPercentage = Math.max(progress * 100, 2);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>Fim de {year}</Text>
        <Text style={styles.value}>{percentage}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${widthPercentage}%` }]} />
      </View>

      <Text style={styles.caption}>O ano continua acabando. Sem emoção.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(12,12,14,0.62)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.9,
  },
  value: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  track: {
    width: "100%",
    height: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10,
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#ffffff",
  },
  caption: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 12,
    fontWeight: "600",
  },
});
