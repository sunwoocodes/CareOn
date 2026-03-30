# CareOn 📱

> **Personal Health Management Mobile App** — Track your diet, symptoms, activities, and connect with a community, all in one place.

---

## 📌 About

CareOn is a mobile healthcare app that helps users manage their daily health data in one unified platform.  
It provides diet logging, symptom checking, health score tracking, and community features to support a healthier lifestyle.

---

## ✨ Features

### 🏠 Home
- Daily **health score** visualization with an animated circular progress chart
- Nutrition balance insights (carbs / protein / fat ratio)
- Today's activity timeline
- Quick access to diet logging and symptom check

### 🍽️ Diet
- Meal logging by category: Breakfast / Lunch / Dinner / Snack
- Nutrient intake tracking
- Diet history log

### 📋 Record
- Daily health data entry and management

### 🩺 Diagnosis
- Symptom input and self-check flow
- Diagnosis analysis result screen (`diagnosis-analysis`)
- Diagnosis history log screen (`diagnosis-log`)

### 🗺️ Map
- Search nearby medical facilities and view locations

### 💬 Community
- Browse health-related posts
- Post detail view with comments (`community/[id]`)

### 👤 Profile
- User information and personal health settings

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Expo](https://expo.dev) ~54 + React Native 0.81 |
| **Language** | TypeScript 5.9 |
| **Routing** | Expo Router (file-based routing) |
| **Styling** | [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS for React Native) |
| **Backend / DB** | [Supabase](https://supabase.com/) (Auth + Database) |
| **Animation** | React Native Animated API, `react-native-reanimated` v4 |
| **UI Components** | `@expo/vector-icons` (MaterialIcons), `expo-linear-gradient`, `expo-blur` |
| **Navigation** | `@react-navigation/bottom-tabs` + `@react-navigation/native` |
| **Graphics** | `react-native-svg` (circular charts, etc.) |
| **Fonts** | Manrope, Plus Jakarta Sans (`@expo-google-fonts`) |
| **Haptics** | `expo-haptics` |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npx expo start
```

Available runtime options:
- **Expo Go** app (iOS / Android)
- **Android Emulator**
- **iOS Simulator**

---

## 📁 Project Structure

```
careon-mobile/
├── app/
│   ├── (tabs)/                 # Bottom tab navigation screens
│   │   ├── index.tsx           # Home
│   │   ├── record.tsx          # Health Record
│   │   ├── map.tsx             # Map
│   │   ├── community.tsx       # Community
│   │   └── profile.tsx         # Profile
│   ├── community/
│   │   └── [id].tsx            # Post detail
│   ├── diet.tsx                # Diet logging
│   ├── diagnosis.tsx           # Symptom diagnosis
│   ├── diagnosis-analysis.tsx  # Diagnosis result
│   ├── diagnosis-log.tsx       # Diagnosis history
│   └── _layout.tsx
├── components/
│   ├── TopBar.tsx              # Shared top bar
│   ├── BottomNav.tsx           # Shared bottom navigation
│   └── supabase.ts             # Supabase client
├── constants/
├── hooks/
└── assets/
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory and configure your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
