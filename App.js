import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Provider,
  SegmentedButtons,
  TextInput,
  Text,
  List,
  MD3DarkTheme,
} from "react-native-paper";

export default function App() {
  const [players, setPlayers] = useState("");
  const [itemprice, setItemPrice] = useState("");
  const [paidgold, setPaidgold] = useState(null);

  const Calculate = () => {
    let realPrice = Number(itemprice) - (5 / 100) * Number(itemprice);
    let goldPerPlayer = realPrice / Number(players);

    return {
      maxbid: Math.floor(realPrice - goldPerPlayer),
      realPrice,
      goldPerPlayer,
    };
  };

  return (
    <Provider theme={MD3DarkTheme}>
      <View
        style={{ backgroundColor: MD3DarkTheme.colors.background, flex: 1 }}
      >
        <Appbar.Header mode="center-aligned" statusBarHeight={13}>
          <Appbar.Content title="Puja Lost Ark" />
        </Appbar.Header>
        <SegmentedButtons
          style={styles.segmented}
          value={players}
          onValueChange={setPlayers}
          buttons={[
            {
              value: "4",
              label: "4 Jugadores",
            },
            {
              value: "8",
              label: "8 Jugadores",
            },
          ]}
        />
        <View style={players < 1 && { display: "none" }}>
          <TextInput
            style={styles.input}
            label="Precio del objeto"
            keyboardType="numeric"
            contextMenuHidden={true}
            value={itemprice}
            onChangeText={(value) => setItemPrice(value)}
            onChange={Calculate}
          />
          <Text variant="displaySmall" style={styles.maxbid}>
            Puja preventiva:{" "}
            <Text style={styles.maxbidvalue}>
              {Math.floor(Calculate().maxbid / 1.1)}
            </Text>
          </Text>
          <Text variant="displaySmall" style={styles.maxbid}>
            Puja máxima:{" "}
            <Text style={styles.maxbidvalue}>{Calculate().maxbid}</Text>
          </Text>
        </View>
        <View style={!Calculate().maxbid && { display: "none" }}>
          <TextInput
            style={styles.paid}
            label="Oro pagado"
            keyboardType="numeric"
            contextMenuHidden={true}
            value={paidgold}
            onChangeText={(value) => setPaidgold(value)}
          />
          {paidgold && (
            <Text variant="displaySmall" style={styles.maxbid}>
              Oro obtenido:{" "}
              <Text
                style={
                  Calculate().realPrice - paidgold < Calculate().goldPerPlayer
                    ? { color: "red", fontWeight: "bold" }
                    : { color: "green", fontWeight: "bold" }
                }
              >
                {Math.floor(Calculate().realPrice - paidgold)}
              </Text>
            </Text>
          )}
        </View>
        <List.Section
          style={!Calculate().maxbid ? { display: "none" } : styles.list}
        >
          <List.Accordion title="Resumen">
            <List.Item
              title={`Precio real (-5%): ${Math.floor(Calculate().realPrice)}`}
              titleStyle={{ fontSize: 20 }}
            />
            <List.Item
              title={`Oro por jugador: ${Math.floor(
                Calculate().goldPerPlayer
              )}`}
              titleStyle={{ fontSize: 20 }}
            />
          </List.Accordion>
        </List.Section>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 20,
    fontSize: 40,
  },
  maxbid: {
    marginLeft: 20,
  },
  maxbidvalue: {
    fontWeight: "bold",
  },
  segmented: {
    justifyContent: "center",
    marginBottom: 20,
  },
  paid: {
    margin: 20,
    marginTop: 60,
    fontSize: 40,
  },
  list: {
    margin: 20,
  },
});
