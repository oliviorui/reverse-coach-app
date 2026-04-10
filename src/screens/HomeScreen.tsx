import { useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import { useRouter } from "expo-router";

import QuoteCard from "../components/QuoteCard";
import ProgressBar from "../components/ProgressBar";
import GenerateButton from "../components/GenerateButton";

import { quotes, type Quote } from "../data/quotes";
import { images, type AppImage } from "../data/images";
import {
  getRandomItem,
  type RandomItemResult,
} from "../utils/getRandomItem";
import { getYearProgress } from "../utils/getYearProgress";
import { saveFavorite } from "../utils/favorites";

export default function HomeScreen() {
  const router = useRouter();
  const shareCardRef = useRef<ViewShot | null>(null);

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );

  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );

  const yearProgress = getYearProgress();

  function handleGenerate() {
    const nextQuote = getRandomItem(quotes, quoteState.index);
    const nextImage = getRandomItem(images, imageState.index);

    setQuoteState(nextQuote);
    setImageState(nextImage);
  }

  async function handleSave() {
    try {
      const result = await saveFavorite({
        id: `${Date.now()}-${quoteState.index}-${imageState.index}`,
        quote: quoteState.item,
        image: imageState.item,
        createdAt: Date.now(),
      });

      if (!result.saved) {
        Alert.alert("Já guardada", "Essa lapada já está nos favoritos.");
        return;
      }

      Alert.alert("Guardado", "Lapada salva com sucesso.");
    } catch {
      Alert.alert("Erro", "Não foi possível guardar a lapada.");
    }
  }

  async function handleShare() {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        Alert.alert("Erro", "A partilha não está disponível neste dispositivo.");
        return;
      }

      const capturedUri = await shareCardRef.current?.capture?.();

      if (!capturedUri) {
        Alert.alert("Erro", "Não foi possível gerar a imagem para partilhar.");
        return;
      }

      await Sharing.shareAsync(capturedUri, {
        mimeType: "image/png",
        dialogTitle: "Compartilhar lapada",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível compartilhar agora.");
    }
  }

  function handleOpenFavorites() {
    router.push("/favorites");
  }

  return (
    <View style={styles.screen}>
      <ViewShot
        ref={shareCardRef}
        options={{
          format: "png",
          quality: 1,
        }}
        style={styles.captureWrapper}
      >
        <ImageBackground
          source={imageState.item}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
          style={styles.background}
        >
          <View style={styles.overlay} />

          <SafeAreaView style={styles.safeArea}>
            <View style={styles.captureContent}>
              <View style={styles.topBadge}>
                <Text style={styles.topBadgeText}>coach reverso.exe</Text>
              </View>

              <View style={styles.centerSpacer} />

              <View style={styles.bottomContent}>
                <QuoteCard quote={quoteState.item} />

                <ProgressBar
                  progress={yearProgress.progress}
                  percentage={yearProgress.percentage}
                  year={yearProgress.year}
                />

                <View style={styles.footerTag}>
                  <Text style={styles.footerTagText}>coach reverso.exe</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ViewShot>

      <View style={styles.buttonArea}>
        <GenerateButton
          onGenerate={handleGenerate}
          onShare={handleShare}
          onSave={handleSave}
          onOpenFavorites={handleOpenFavorites}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  captureWrapper: {
    flex: 1,
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
  captureContent: {
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
  centerSpacer: {
    flex: 1,
  },
  bottomContent: {
    width: "100%",
  },
  footerTag: {
    alignSelf: "center",
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  footerTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#000",
  },
});
