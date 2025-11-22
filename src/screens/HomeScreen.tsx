import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CalendarView from "../components/CalendarView";
import { getMonthlyAverage, getWeeklyAverage } from "../services/wellbeingStorage";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
  const [monthly, setMonthly] = useState<number | null>(null);
  const [weekly, setWeekly] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    loadAverages();
    const unsub = navigation.addListener("focus", () => loadAverages());
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAverages() {
    setMonthly(await getMonthlyAverage());
    setWeekly(await getWeeklyAverage());
  }

  function emojiMood(value: number | null) {
    if (value === null) return "—";
    const rounded = Math.round(value);
    return ["😡", "😔", "😐", "🙂", "😄"][rounded - 1] || "—";
  }

  function handleNewRecord(date?: string) {
    navigation.navigate("AddEntry", { date });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao WorkWell 👋</Text>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Resumo de Bem-estar</Text>
        <View style={styles.row}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Média semanal</Text>
            <Text style={styles.metricValue}>{emojiMood(weekly)}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Média mensal</Text>
            <Text style={styles.metricValue}>{emojiMood(monthly)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Acompanhamento mensal</Text>
        <CalendarView onDateSelect={setSelectedDate} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleNewRecord(selectedDate ?? undefined)}>
        <Text style={styles.buttonText}>Registrar Humor {selectedDate ? `(${selectedDate})` : ""}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryBtn]} onPress={() => navigation.navigate("History")}>
        <Text style={[styles.buttonText, { color: "black" }]}>Ver Histórico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  box: { backgroundColor: "#F5F5F5", borderRadius: 10, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  metric: { alignItems: "center" },
  metricLabel: { fontSize: 14, opacity: 0.7 },
  metricValue: { fontSize: 32, marginTop: 5 },
  button: { backgroundColor: "black", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  buttonText: { fontSize: 18, color: "white" },
  secondaryBtn: { backgroundColor: "#DDDDDD" }
});
