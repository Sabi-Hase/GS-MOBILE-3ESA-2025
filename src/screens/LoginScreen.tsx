import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createUser, loginWithId } from "../services/wellbeingStorage";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loginId, setLoginId] = useState("");

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function handleRegister() {
    if (!name.trim()) return Alert.alert("Preencha o nome");
    if (!validateEmail(email)) return Alert.alert("Email inválido");
    const user = await createUser(name.trim(), email.trim());
    Alert.alert("Registrado", `Seu ID: ${user.id}. Use-o para login.`);
    // navigate to home directly
    navigation.replace("Home", { userId: user.id });
  }

  async function handleLogin() {
    if (!loginId.trim()) return Alert.alert("Digite seu ID");
    const user = await loginWithId(loginId.trim().toUpperCase());
    if (!user) return Alert.alert("ID não encontrado");
    navigation.replace("Home", { userId: user.id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WorkWell — Login / Registro</Text>

      <Text style={styles.label}>Registrar novo usuário</Text>
      <TextInput placeholder="Nome completo" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

      <Button title="Registrar & Entrar" onPress={handleRegister} />

      <View style={{ height: 24 }} />

      <Text style={styles.label}>Já tem ID? Faça login</Text>
      <TextInput placeholder="EMP1234" value={loginId} onChangeText={t => setLoginId(t.toUpperCase())} style={styles.input} />
      <Button title="Entrar com ID" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { marginTop: 10, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginTop: 8 }
});
