import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type QuoteCardProps = {
  quote: string;
  isDaily?: boolean;
};

export default function QuoteCard({ quote, isDaily = false }: QuoteCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = 16;

    opacity.value = withTiming(1, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });

    translateY.value = withTiming(0, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  }, [quote, isDaily, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <BlurView
        intensity={28}
        tint="dark"
        style={[styles.card, isDaily ? styles.cardDaily : null]}
      >
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
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 18,
    borderRadius: 28,
    overflow: "hidden",
  },
  card: {
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 20,
    backgroundColor: "rgba(15,15,18,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardDaily: {
    backgroundColor: "rgba(18,18,24,0.52)",
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
