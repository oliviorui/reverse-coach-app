import { StyleSheet, Text, View } from "react-native";

type ProgressBarProps = {
  progress: number;
  percentage: number;
  year: number;
};

export default function ProgressBar({
  progress,
  percentage,
}: ProgressBarProps) {
  const widthPercentage = Math.max(progress * 100, 2);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{percentage}% do ano já passou… e aí?</Text>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${widthPercentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 22,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  track: {
    width: "100%",
    height: 16,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 999,
  },
});
