import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  SegmentedButtons,
  TextInput,
  Text,
  List,
  Divider,
  MD3DarkTheme,
} from "react-native-paper";
import i18n from "./translation/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  useEffect(() => {
    const getUserPreferences = async () => {
      try {
        const preferences = await AsyncStorage.getItem("@players");
        if (preferences !== null) {
          setPlayers(preferences);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserPreferences();
  }, []);

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
    <ScrollView
      style={{ backgroundColor: MD3DarkTheme.colors.background, flex: 1 }}
    >
      <SegmentedButtons
        style={styles.segmented}
        value={players}
        onValueChange={setPlayers}
        buttons={[
          {
            value: "4",
            label: i18n.t("players4"),
          },
          {
            value: "8",
            label: i18n.t("players8"),
          },
        ]}
      />
      <View style={players < 1 && { display: "none" }}>
        <TextInput
          style={styles.input}
          label={i18n.t("price")}
          keyboardType="numeric"
          contextMenuHidden={true}
          value={itemprice}
          onChangeText={(value) => setItemPrice(value)}
          onChange={Calculate}
        />
        <View style={styles.total}>
          <Text variant="displaySmall" style={styles.maxbid}>
            {i18n.t("bid")}{" "}
            <Text style={styles.maxbidvalue}>
              {Math.floor(Calculate().maxbid / 1.1)}
            </Text>
          </Text>
        </View>
        <View style={styles.total}>
          <Text variant="displaySmall" style={styles.maxbid}>
            {i18n.t("maxbid")}{" "}
            <Text style={styles.maxbidvalue}>{Calculate().maxbid}</Text>
          </Text>
        </View>

        <List.Section
          style={!Calculate().maxbid ? { display: "none" } : styles.list}
        >
          <List.Accordion title={i18n.t("details")}>
            <List.Item
              title={`${i18n.t("realprice")}: ${Math.floor(
                Calculate().realPrice
              )}`}
              titleStyle={{ fontSize: 20 }}
            />
            <List.Item
              title={`${i18n.t("goldperplayer")}: ${Math.floor(
                Calculate().goldPerPlayer
              )}`}
              titleStyle={{ fontSize: 20 }}
            />
          </List.Accordion>
        </List.Section>

        <Divider style={styles.divider} />
      </View>
      <View style={!Calculate().maxbid && { display: "none" }}>
        <TextInput
          style={styles.paid}
          label={i18n.t("paid")}
          keyboardType="numeric"
          contextMenuHidden={true}
          value={paidgold}
          onChangeText={(value) => setPaidgold(value)}
        />
        <View style={styles.total}>
          {paidgold && (
            <Text variant="displaySmall" style={styles.maxbid}>
              {i18n.t("profit")}{" "}
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
      </View>
      <List.Section style={!paidgold ? { display: "none" } : styles.list}>
        <List.Accordion title={i18n.t("summary")}>
          <List.Item
            title={`${i18n.t("profitperplayer")} (${players - 1}): ${Math.floor(
              paidgold / (players - 1)
            )}`}
            titleStyle={{ fontSize: 20 }}
          />
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    fontSize: 40,
  },
  maxbid: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
  },
  maxbidvalue: {
    fontWeight: "bold",
  },
  segmented: {
    justifyContent: "center",
    marginBottom: 20,
  },
  paid: {
    marginHorizontal: 20,
    marginBottom: 20,
    fontSize: 40,
  },
  list: {
    margin: 20,
  },
  total: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  divider: {
    margin: 20,
  },
});
