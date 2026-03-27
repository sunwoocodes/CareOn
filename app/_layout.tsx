import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useFonts } from 'expo-font';
import { Manrope_700Bold } from '@expo-google-fonts/manrope';
import { PlusJakartaSans_400Regular, PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might cause this to error, so we catch it */
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Manrope-Bold': Manrope_700Bold,
    'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Medium': PlusJakartaSans_500Medium,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("폰트 로딩 중 에러 발생:", error);
      // 에러가 발생해도 앱 진입은 가능하게 처리
      SplashScreen.hideAsync().catch(() => {});
      setIsReady(true);
    }

    if (loaded) {
      console.log("폰트 로딩 완료");
      SplashScreen.hideAsync().catch(() => {});
      setIsReady(true);
    }

    // 만약 어떤 이유로든 폰트 로딩이 5초 이상 걸리면 강제로 화면을 보여줌
    const timeout = setTimeout(() => {
      if (!isReady && !loaded) {
        console.warn("로딩 타임아웃: 스플래시 화면을 강제로 숨깁니다.");
        SplashScreen.hideAsync().catch(() => {});
        setIsReady(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loaded, error, isReady]);

  // isReady가 false이면 아무것도 렌더링하지 않아 스플래시 화면이 유지됨
  if (!isReady) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="diagnosis-analysis" options={{ headerShown: false }} />
        <Stack.Screen name="diagnosis" options={{ headerShown: false }} />
        <Stack.Screen name="diagnosis-log" options={{ headerShown: false }} />
        <Stack.Screen name="diet" options={{ headerShown: false }} />
        <Stack.Screen name="community/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

