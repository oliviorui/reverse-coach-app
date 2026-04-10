import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";

import { getFavorites, removeFavorite, type FavoriteItem } from "../utils/favorites";

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const loadFavorites = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadFavorites();
    }, [loadFavorites])
  );

  async function handleRemove(id: string) {
    try {
      await removeFavorite(id);
      await loadFavorites();
    } catch {
      Alert.alert("Erro", "Não foi possível remover o favorito.");
    }
  }

  function renderItem({ item }: { item: FavoriteItem }) {
    return (
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        imageStyle={styles.cardImage}
        style={styles.card}
      >
        <View style={styles.cardOverlay} />

        <View style={styles.cardContent}>
          <Text style={styles.cardQuote}>{item.quote}</Text>

          <View style={styles.cardActions}>
            <Pressable
              style={styles.smallButton}
              onPress={() => handleRemove(item.id)}
            >
              <Text style={styles.smallButtonText}>Remover</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>

        <Text style={styles.title}>Favoritos</Text>

        <View style={styles.headerSpacer} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nada guardado ainda.</Text>
          <Text style={styles.emptyText}>
            Guarda algumas lapadas e elas aparecem aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  headerSpacer: {
    width: 68,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  listContent: {
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    minHeight: 220,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  cardImage: {
    borderRadius: 24,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.52)",
  },
  cardContent: {
    padding: 18,
  },
  cardQuote: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 30,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  smallButton: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});
