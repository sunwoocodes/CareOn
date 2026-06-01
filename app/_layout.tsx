import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useFonts } from 'expo-font';
// 기존 구글 폰트(Manrope, PlusJakartaSans) 임포트는 지웠습니다!
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

const PREFETCH_IMAGES = [
  'https://i.pravatar.cc/150?img=3',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
  'https://i.pravatar.cc/150?img=5',
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200',
  'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200'
];

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might cause this to error, so we catch it */
});

export default function RootLayout() {
  // 🌟 1. 프리텐다드 폰트로 교체! (경로: ../assets/fonts/...)
  const [loaded, error] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-ExtraBold': require('../assets/fonts/Pretendard-ExtraBold.ttf'),
  });

  const [isReady, setIsReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function preloadAssets() {
      try {
        await Promise.all(PREFETCH_IMAGES.map(url => Image.prefetch(url)));
      } catch (e) {
        console.log("이미지 로딩 에러 (무시):", e);
      } finally {
        setImagesLoaded(true);
      }
    }
    preloadAssets();
  }, []);

  useEffect(() => {
    if ((loaded || error) && imagesLoaded) {
      SplashScreen.hideAsync().catch(() => { });
      setIsReady(true);
    }

    // 만약 어떤 이유로든 에셋 로딩이 5초 이상 걸리면 강제로 화면을 보여줌
    const timeout = setTimeout(() => {
      if (!isReady && (!loaded || !imagesLoaded)) {
        console.warn("로딩 타임아웃: 스플래시 화면을 강제로 숨깁니다.");
        SplashScreen.hideAsync().catch(() => { });
        setIsReady(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loaded, error, imagesLoaded, isReady]);

  // isReady가 false이면 아무것도 렌더링하지 않아 스플래시 화면이 유지됨
  if (!isReady) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ animation: 'fade', animationDuration: 250 }}>
        {/* 푸앙님이 설정해두신 스크린 목록 그대로 유지! */}
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