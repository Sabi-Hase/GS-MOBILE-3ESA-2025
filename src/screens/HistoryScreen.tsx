import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteEntry, getEntries } from "../services/wellbeingStorage";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

type Entry = {
  id: number;
  mood: 1 | 2 | 3 | 4 | 5;
  notes?: string; // ← agora opcional
  date: string;
};

export default function HistoryScreen({ navigation }: Props) {
  const [entries, setEntries] = useState<Entry[]>([]);

  async function load() {
    const data = await getEntries();
    setEntries(data.reverse()); // mais novo primeiro
  }

  useEffect(() => {
    load();
    const unsub = navigation.addListener("focus", () => load());
    return unsub;
  }, [navigation]); // dependency agora correta

  async function handleDelete(id: number) {
    Alert.alert("Excluir registro", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteEntry(id);
          load();
        }
      }
    ]);
  }

  function moodEmoji(m: number) {
    return ["😡","😞","😐","😊","🤩"][m-1];
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      {entries.length === 0 && (
        <Text style={styles.noData}>Sem registros ainda.</Text>
      )}

      {entries.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.emoji}>{moodEmoji(item.mood)}</Text>
          <Text style={styles.date}>{item.date}</Text>
          {item.notes ? <Text style={styles.notes}>📝 {item.notes}</Text> : null}

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.edit]}
              onPress={() => navigation.navigate("AddEntry", { edit: item })}
            >
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.delete]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.btnText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  noData: { textAlign: "center", marginTop: 40, opacity: 0.6 },

  card: {
    backgroundColor: "#F6F6F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  emoji: { fontSize: 32, textAlign: "center" },
  date: { fontSize: 12, opacity: 0.6, textAlign: "center", marginTop: 3 },
  notes: { fontSize: 14, marginTop: 6, color: "#333" },

  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },

  btn: { flex: 1, padding: 10, marginHorizontal: 5, borderRadius: 6 },
  edit: { backgroundColor: "#4CAF50" },
  delete: { backgroundColor: "#E53935" },
  btnText: { color: "#FFF", textAlign: "center", fontWeight: "bold" }
});
