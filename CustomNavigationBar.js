import { Appbar } from "react-native-paper";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "./localization";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default function CustomNavigationBar({ navigation, back, route }) {
  return (
    <Appbar.Header statusBarHeight={0}>
      {back ? (
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title={route.name} />
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
