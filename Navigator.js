import { Appbar } from "react-native-paper";
import i18n from "./translation/i18n";

export default function Navigator({ navigation, back, route }) {
  return (
    <Appbar.Header statusBarHeight={0}>
      {back ? (
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content
            title={
              route.name === "Help"
                ? i18n.t("help")
                : route.name === "Settings"
                ? i18n.t("settings")
                : route.name
            }
          />
        </>
      ) : null}

      {!back ? (
        <>
          <Appbar.Content
            title={i18n.t("title")}
            titleStyle={{ marginLeft: 20 }}
          />
          <Appbar.Action
            icon="help-circle-outline"
            onPress={() => navigation.navigate("Help")}
          />
          <Appbar.Action
            icon="cog-outline"
            onPress={() => navigation.navigate("Settings")}
          />
        </>
      ) : null}
    </Appbar.Header>
  );
}
