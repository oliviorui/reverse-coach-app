import { StyleSheet, Text, View } from "react-native";

type QuoteCardProps = {
  quote: string;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Frase do momento</Text>
      <Text style={styles.quote}>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 22,
  },
  label: {
    color: "rgba(255,255,255,0.74)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
    textAlign: "center",
  },
  quote: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 38,
  },
});
