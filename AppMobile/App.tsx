import { StyleSheet, View, Text, Button, TextInput, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import PlayersList from './components/Players_List';

const sendCommand = async (command: string) => {
  try {
    const response = await fetch('http://192.168.1.180:3000/send-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    });

    const data = await response.json();
    Alert.alert('Réponse du serveur Minecraft', data.message);
  } catch (error) {
    console.error('Erreur lors de l’envoi de la commande :', error);
  }
};

const startServeur = async () => {
  try {
    const response = await fetch("http://192.168.1.180:3000/start", {
      method: "POST"
    });
    const data = await response.json();
    Alert.alert('Démarrage du serveur', data.message);
  } catch (error) {
    console.error("Impossible de démarrer le serveur :", error);
  }
};

function App(): React.JSX.Element {
  const [command, setCommand] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🟩 Panneau de contrôle Minecraft</Text>
      <ScrollView style={styles.content}>

        <PlayersList />

        <Text style={styles.label}>Envoyer une commande RCON :</Text>
        <TextInput
          style={styles.input}
          value={command}
          onChangeText={setCommand}
          placeholder="Ex: say Bonjour à tous !"
          placeholderTextColor="#ccc"
        />
        <View style={styles.button}>
          <Button title="Envoyer la commande" onPress={() => sendCommand(command)} />
        </View>

        <View style={styles.button}>
          <Button title="Démarrer le serveur" color="#4CAF50" onPress={startServeur} />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    flex: 1,
    paddingTop: 50,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    color: "#00FF00",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#2c2c2c",
    color: "#fff",
    padding: 10,
    borderRadius: 6,
    borderColor: "#444",
    borderWidth: 1,
  },
  button: {
    marginTop: 15,
  },
});

export default App;
