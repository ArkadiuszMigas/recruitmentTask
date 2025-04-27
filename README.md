
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
https://github.com/twoje-repozytorium/recruitmentTask.git
cd recruitmentTask
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
```

4. **Instalacja dodatkowych konfiguracji** (SVG jako komponenty):

W pliku `metro.config.js` powinno znajdować się:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = config;
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
JAVA_HOME=C:\Program Files\Java\jdk-11.0.x
```
Oraz dodaj do PATH:
```plaintext
%JAVA_HOME%\bin
```

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

---

> W razie problemów sprawdź poprawność konfiguracji `JAVA_HOME`, Android SDK oraz wersji Expo SDK.

Powodzenia! 🎉
