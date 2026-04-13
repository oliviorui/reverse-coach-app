import { StyleSheet, Text, View } from "react-native";

type QuoteCardProps = {
  quote: string;
  isDaily?: boolean;
};

export default function QuoteCard({ quote, isDaily = false }: QuoteCardProps) {
  return (
    <View style={[styles.card, isDaily ? styles.cardDaily : null]}>
      <View style={styles.topRow}>
        <Text style={styles.kicker}>
          {isDaily ? "Lapada oficial do dia" : "Lapada aleatória"}
        </Text>

        {isDaily ? (
          <View style={styles.dailyBadge}>
            <Text style={styles.dailyBadgeText}>Hoje</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.quote}>{quote}</Text>

      <Text style={styles.helper}>
        {isDaily
          ? "Essa frase fica fixa até amanhã."
          : "Gera outra até encontrar a mais ofensivamente precisa."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 20,
    backgroundColor: "rgba(15,15,18,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginBottom: 18,
  },
  cardDaily: {
    backgroundColor: "rgba(18,18,24,0.82)",
    borderColor: "rgba(255,255,255,0.22)",
  },
  topRow: {
    width: "100%",
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  kicker: {
    flex: 1,
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  dailyBadge: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  dailyBadgeText: {
    color: "#111111",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  quote: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 40,
    letterSpacing: -0.6,
    marginBottom: 14,
  },
  helper: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
});
