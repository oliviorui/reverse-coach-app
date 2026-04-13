import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  const widthProgress = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    widthProgress.value = withTiming(Math.max(progress, 0.02), {
      duration: 550,
      easing: Easing.out(Easing.cubic),
    });

    opacity.value = withTiming(1, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });

    translateY.value = withTiming(0, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, opacity, translateY, widthProgress]);

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${widthProgress.value * 100}%`,
    };
  });

  return (
    <Animated.View style={[styles.wrapper, wrapperAnimatedStyle]}>
      <BlurView intensity={24} tint="dark" style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.label}>Fim de {year}</Text>
          <Text style={styles.value}>{percentage}%</Text>
        </View>

        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillAnimatedStyle]} />
        </View>

        <Text style={styles.caption}>O ano continua acabando. Sem emoção.</Text>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 18,
    borderRadius: 22,
    overflow: "hidden",
  },
  card: {
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(12,12,14,0.36)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
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
