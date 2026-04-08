# BookMySlot - Appointment Booking Mobile App

A React Native mobile application for booking appointments with various service providers. Built using Expo, Expo Router, and AsyncStorage for local data persistence without a backend server.

## Features

- **Authentication Flow**: User registration and login using simulated local storage APIs.
- **Service Provider Directory**: Browse professionals across categories like Doctor, Dentist, Salon, Fitness, and Legal. Category filtering is available on the Home screen.
- **Provider Details**: View detailed information about a provider including experience, rating, pricing, and a short biography.
- **Appointment Booking Flow**: Select a specific date from a calendar, choose an available time slot, and confirm the booking. Bookings are saved locally.
- **My Appointments Management**: View upcoming and past appointments. Users can browse their history and cancel upcoming bookings with a single tap.
- **Profile Screen**: User settings interface, displaying user data, mock preference actions, and a logout feature.
- **Offline / Local Data**: Complete functionality powered by `AsyncStorage`. Providers are mocked but function accurately for bookings.

## Technologies Used

- **React Native / Expo (SDK 55)**: App initialization and development framework.
- **Expo Router**: App navigation built on a file-based routing architecture.
- **AsyncStorage**: Local persistence for auth state and appointment history.
- **React Native Calendars**: Integrated for the date selection UI.
- **Expo Image**: Performant rendering of provider display photos.
- **Expo Linear Gradient**: Enhancing the primary buttons.
- **Inter Font & Ionicons**: Smooth, modern typography combined with consistent scalable icons.

## How to Run the App (Development)

Ensure you have Node.js installed on your machine.

1. **Install Dependencies** (if not already installed during setup):
   ```bash
   npm install
   ```

2. **Start the Expo Development Server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **View on your Device**: 
   - Download the **Expo Go** application on your iOS or Android device.
   - Scan the QR code presented in the terminal.

4. **View on Emulator**: 
   - Press `a` in the terminal to open the app on an Android Emulator.
   - Press `i` to open in an iOS simulator (macOS only).
   - Press `w` to open it in a web browser.

## Generating the APK (EAS Build)

EAS requires an Expo account and `eas-cli`. Since compiling directly on Windows sometimes requires the full Android SDK toolset, the cloud compilation is highly recommended.

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Log into Expo Account**:
   ```bash
   eas login
   ```

3. **Start Android Build**:
   ```bash
   eas build -p android --profile preview
   ```
   *Note: This utilizes the `eas.json` profile designed expressly for APK generation (`"buildType": "apk"`).*

4. Download the generated `.apk` file using the URL provided at the end of the `eas build` terminal process, and install it on any Android device.

## Assumptions Made
- Mock providers have random availabilities for the booking feature. Slots blocked based on arbitrary logic (`hash % 3 !== 0`) stand in for real backend scheduling logic.
- The `expo-router` enforces an authentication context layout `_layout.tsx` layer where unauthenticated users can access `login.tsx` while authenticated users reach the inner `(tabs)` flow. By using `Context API` paired with `AsyncStorage`, persistent authentication succeeds locally.
- The UI defaults to a bright, clean Light Mode configuration.
