import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuoteCard from "../components/QuoteCard";
import ProgressBar from "../components/ProgressBar";
import GenerateButton from "../components/GenerateButton";

import { quotes } from "../data/quotes";
import { images } from "../data/images";
import { getRandomItem } from "../utils/getRandomItem";
import { getYearProgress } from "../utils/getYearProgress";

export default function HomeScreen() {
  const [quoteState, setQuoteState] = useState(() => getRandomItem(quotes));
  const [imageState, setImageState] = useState(() => getRandomItem(images));

  const yearProgress = getYearProgress();

  function handleGenerate() {
    const nextQuote = getRandomItem(quotes, quoteState.index);
    const nextImage = getRandomItem(images, imageState.index);

    setQuoteState(nextQuote);
    setImageState(nextImage);
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={imageState.item}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.background}
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.topBadge}>
              <Text style={styles.topBadgeText}>coach reverso.exe</Text>
            </View>

            <View style={styles.bottomContent}>
              <QuoteCard quote={quoteState.item} />

              <ProgressBar
                progress={yearProgress.progress}
                percentage={yearProgress.percentage}
                year={yearProgress.year}
              />

              <GenerateButton onPress={handleGenerate} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  topBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.48)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  topBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  bottomContent: {
    width: "100%",
  },
});
