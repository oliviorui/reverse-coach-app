import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
import {
  requestNotificationPermission,
  scheduleDailyNotification,
} from "../utils/notifications";
import { getDailyQuote } from "../utils/getDailyQuote";

export default function HomeScreen() {
  const router = useRouter();
  const shareCardRef = useRef<ViewShot | null>(null);

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );

  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );

  const [isDailyMode, setIsDailyMode] = useState<boolean>(false);

  const yearProgress = getYearProgress();

  const backgroundOpacity = useSharedValue(1);

  useEffect(() => {
    backgroundOpacity.value = 0.86;
    backgroundOpacity.value = withTiming(1, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [imageState.item, backgroundOpacity]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  function handleGenerate() {
    if (isDailyMode) {
      return;
    }

    const nextQuote = getRandomItem(quotes, quoteState.index);
    const nextImage = getRandomItem(images, imageState.index);

    setQuoteState(nextQuote);
    setImageState(nextImage);
  }

  function handleDailyMode() {
    const dailyQuote = getDailyQuote();

    setQuoteState({
      item: dailyQuote,
      index: -1,
    });

    setIsDailyMode(true);

    Alert.alert("Frase do dia", "Essa é a tua lapada oficial de hoje.");
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

  async function handleEnableNotifications() {
    try {
      const hasPermission = await requestNotificationPermission();

      if (!hasPermission) {
        Alert.alert(
          "Permissão negada",
          "Ativa as notificações nas definições do telemóvel."
        );
        return;
      }

      const scheduled = await scheduleDailyNotification();

      if (!scheduled) {
        Alert.alert(
          "Limitação do Expo Go",
          "Notificações não funcionam aqui. Só em build real."
        );
        return;
      }

      Alert.alert("Ativado", "Agora vais receber lapadas diárias.");
    } catch {
      Alert.alert("Erro", "Não foi possível ativar.");
    }
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
        <Animated.View style={[styles.captureWrapper, backgroundAnimatedStyle]}>
          <ImageBackground
            source={imageState.item}
            resizeMode="cover"
            imageStyle={styles.backgroundImage}
            style={styles.background}
          >
            <View style={styles.overlay} />
            <View style={styles.topGlow} />
            <View style={styles.bottomShade} />

            <SafeAreaView style={styles.safeArea}>
              <View style={styles.captureContent}>
                <View style={styles.heroHeader}>
                  <BlurView intensity={24} tint="dark" style={styles.brandPill}>
                    <Text style={styles.brandPillText}>coach reverso.exe</Text>
                  </BlurView>

                  <Text style={styles.heroTitle}>
                    {isDailyMode ? "Frase do dia" : "Gerador de lapadas"}
                  </Text>

                  <Text style={styles.heroSubtitle}>
                    {isDailyMode
                      ? "Uma verdade inconveniente por dia."
                      : "Humor ácido, caos visual e progresso existencial."}
                  </Text>
                </View>

                <View style={styles.mainContent}>
                  <QuoteCard quote={quoteState.item} isDaily={isDailyMode} />

                  <ProgressBar
                    progress={yearProgress.progress}
                    percentage={yearProgress.percentage}
                    year={yearProgress.year}
                  />
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </Animated.View>
      </ViewShot>

      <View style={styles.bottomPanel}>
        <GenerateButton
          onGenerate={handleGenerate}
          onShare={handleShare}
          onSave={handleSave}
          onOpenFavorites={handleOpenFavorites}
          onEnableNotifications={handleEnableNotifications}
          onDaily={handleDailyMode}
          isDaily={isDailyMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#050505",
  },
  captureWrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.92,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(6,6,8,0.44)",
  },
  topGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  bottomShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 320,
    backgroundColor: "rgba(0,0,0,0.36)",
  },
  safeArea: {
    flex: 1,
  },
  captureContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 18,
  },
  heroHeader: {
    gap: 10,
    paddingTop: 6,
  },
  brandPill: {
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  brandPillText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.9,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
    lineHeight: 38,
    maxWidth: "88%",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
    maxWidth: "88%",
  },
  mainContent: {
    width: "100%",
  },
  bottomPanel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#050505",
  },
});
