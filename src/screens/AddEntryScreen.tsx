import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MoodValue, saveEntry, updateEntry, WellbeingEntry } from "../services/wellbeingStorage";

type Props = NativeStackScreenProps<any>;

export default function AddEntryScreen({ navigation, route }: Props) {
  const editingEntry: WellbeingEntry | undefined = route?.params?.entry;
  const routeDate: string | undefined = route?.params?.date;

  const [mood, setMood] = useState<MoodValue | null>(editingEntry ? editingEntry.mood : null);
  const [notes, setNotes] = useState<string>(editingEntry?.notes ?? "");
  const [date, setDate] = useState<string>(editingEntry?.date ?? (routeDate ?? new Date().toISOString().slice(0, 10)));

  useEffect(() => {
    if (!editingEntry && routeDate) setDate(routeDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeDate]);

  function isFutureDate(dStr: string) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = new Date(dStr); d.setHours(0, 0, 0, 0);
    return d.getTime() > today.getTime();
  }

  async function handleSave() {
    if (!mood) return Alert.alert("Selecione um humor");
    if (isFutureDate(date)) return Alert.alert("Não é permitido registrar para uma data futura.");

    const entry: WellbeingEntry = {
      id: editingEntry ? editingEntry.id : Date.now(),
      mood,
      notes,
      date
    };

    if (editingEntry) {
      await updateEntry(entry);
      Alert.alert("Atualizado", "Registro atualizado.");
    } else {
      await saveEntry(entry);
      Alert.alert("Salvo", "Registro salvo com sucesso.");
    }

    navigation.navigate("History", { refresh: true });
  }

  const moods = [
    { value: 1, emoji: "😡", label: "Péssimo" },
    { value: 2, emoji: "😔", label: "Ruim" },
    { value: 3, emoji: "😐", label: "OK" },
    { value: 4, emoji: "🙂", label: "Bom" },
    { value: 5, emoji: "😄", label: "Ótimo" }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingEntry ? "Editar Registro" : "Novo Registro"}</Text>

      <Text style={styles.label}>Data</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={{ fontSize: 12, color: "gray", marginBottom: 8 }}>Para alterar a data, escolha no calendário antes de abrir esta tela.</Text>

      <Text style={styles.label}>Como você se sentiu?</Text>
      <View style={styles.row}>
        {moods.map((m) => (
          <TouchableOpacity key={m.value} style={[styles.moodBtn, mood === m.value && styles.selected]} onPress={() => setMood(m.value as MoodValue)}>
            <Text style={styles.emoji}>{m.emoji}</Text>
            <Text style={styles.mLabel}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Anotações (opcional)</Text>
      <TextInput style={styles.input} placeholder="Observações" value={notes} onChangeText={setNotes} multiline />

      <Button title={editingEntry ? "Atualizar" : "Salvar"} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  label: { fontWeight: "600", marginTop: 10 },
  date: { padding: 8, backgroundColor: "#f3f3f3", borderRadius: 6, marginTop: 6 },

  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  moodBtn: { width: 64, height: 92, backgroundColor: "#eee", borderRadius: 8, alignItems: "center", justifyContent: "center" },
  selected: { borderWidth: 2, borderColor: "#333" },
  emoji: { fontSize: 34 },
  mLabel: { fontSize: 12, marginTop: 6, textAlign: "center" },

  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginTop: 10, minHeight: 80 }
});
