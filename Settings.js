import { useState, useEffect } from "react";
import { View } from "react-native";
import { MD3DarkTheme, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "./localization";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default function Settings() {
  const [selectedPlayers, setSelectedPlayers] = useState(null);

  useEffect(() => {
    const getUserPreferences = async () => {
      try {
        const preferences = await AsyncStorage.getItem("@players");
        if (preferences !== null) {
          setSelectedPlayers(preferences);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserPreferences();
  }, []);

  const saveSelectedPlayers = async (value) => {
    try {
      await AsyncStorage.setItem("@players", value);
      setSelectedPlayers(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: MD3DarkTheme.colors.background, flex: 1 }}>
      <Text
        variant="titleLarge"
        style={{ paddingHorizontal: 15, paddingTop: 15 }}
      >
        {i18n.t("playerstitle")}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Picker
          selectedValue={selectedPlayers}
          onValueChange={(value) => saveSelectedPlayers(value)}
          dropdownIconColor="white"
          prompt={i18n.t("playerstitle")}
          style={{ color: "white", width: 200 }}
        >
          <Picker.Item label={i18n.t("default")} value="" />
          <Picker.Item label={i18n.t("players4")} value="4" />
          <Picker.Item label={i18n.t("players8")} value="8" />
        </Picker>
      </View>
    </View>
  );
}
