import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface PlayerProps {
  name: string;
}

function Player({ name }: PlayerProps): React.JSX.Element {
  return (
    <View style={styles.playerContainer}>
      <Text style={styles.playerText}>{name}</Text>
    </View>
  );
}

function PlayersList(): React.JSX.Element {
  const [players, setPlayers] = React.useState<string[]>([]);

  const getPlayers = async () => {
    try {
      const response = await fetch("http://192.168.1.180:3000/player_list", {
        method: "POST",
      });
      const data = await response.json() as { message: string[] };
      setPlayers(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Joueurs en ligne :</Text>
      {
        players.length > 0 ? (
          players.map((player) => (
            <Player key={player} name={player} />
          ))
        ) : (
          <Text style={styles.noPlayer}>Aucun joueur connecté</Text>
        )
      }
      <View style={styles.reloadButton}>
        <Button title="🔄 Recharger" onPress={getPlayers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2b2b2b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playerContainer: {
    padding: 10,
    backgroundColor: "#3c3c3c",
    marginBottom: 8,
    borderRadius: 8,
  },
  playerText: {
    color: "#fff",
    fontSize: 16,
  },
  noPlayer: {
    color: "#bbb",
    fontStyle: "italic",
  },
  reloadButton: {
    marginTop: 10,
  },
});

export default PlayersList;
