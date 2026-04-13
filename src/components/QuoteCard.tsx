import { StyleSheet, Text, View } from "react-native";

type QuoteCardProps = {
  quote: string;
  isDaily?: boolean;
};

export default function QuoteCard({ quote, isDaily }: QuoteCardProps) {
  return (
    <View style={[styles.card, isDaily && styles.dailyCard]}>
      {isDaily && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Frase do dia</Text>
        </View>
      )}

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
  dailyCard: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  badge: {
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  badgeText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  quote: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 38,
  },
});
