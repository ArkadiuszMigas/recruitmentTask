
## Instrukcja uruchomienia projektu

### Wymagania

- **Node.js** w wersji 18 lub wyższej
- **npm** lub **yarn**
- **Expo CLI** (globalnie zainstalowane)
- **Android Studio** (do emulatora) lub urządzenie fizyczne (Android / iOS)
- **Java Development Kit (JDK 17)** lub wyższej
- **VSCode**

### Instalacja zależności

1. **Klonuj repozytorium**:

```bash
git clone https://github.com/ArkadiuszMigas/recruitmentTask.git
```

2. **Zainstaluj pakiety**:

```bash
npm install
```
Lub jeśli używasz yarn:
```bash
yarn install
```

3. **Zainstaluj dodatkowe paczki native**:

```bash
npm install react-native-video
npm install react-native-svg react-native-svg-transformer
npx expo install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context
```

4. **Instalacja dodatkowych konfiguracji** (SVG jako komponenty):

W pliku `metro.config.js` powinno znajdować się:

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const createConfig = () => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };
  return config;
};

const config = createConfig();
module.exports = withNativeWind(config, { input: "./app/globals.css" , });
```

5. **Prebuild projektu (jeśli pierwszy raz)**:

```bash
npx expo prebuild
```

6. **Uruchomienie aplikacji**:

**Na emulatorze Androida**:

```bash
npx expo run:android
```

**Na iOS (Mac wymagany)**:

```bash
npx expo run:ios
```

Lub możesz budować APK:

```bash
npx expo run:android --variant release
```

### Konfiguracja środowiska Android (JAVA_HOME)

W systemowych zmiennych środowiskowych ustaw:

```plaintext
JAVA_HOME=C:\Program Files\Java\jdk-17.0.x
```
Oraz dodaj do PATH w zmiennych środowiskowych

Sprawdź:
```bash
java -version
```

### Uwagi dodatkowe

- **Expo Go NIE obsługuje** `react-native-video`. Musisz korzystać z `expo run:android/ios`.

### Struktura ważnych plików

```plaintext
/app/screens/DetailsScreen.tsx
/components/VideoPlayer.tsx
/assets/video/broadchurch.mp4
/assets/icons/*.svg
/metro.config.js
```

### Przydatne komendy

- Uruchomienie serwera deweloperskiego:
```bash
npx expo start
```

- Budowanie Android APK lokalnie:
```bash
cd android && ./gradlew assembleRelease
```

