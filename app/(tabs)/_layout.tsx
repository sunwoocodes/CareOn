import { Tabs } from 'expo-router';
import BottomNav from '../../components/BottomNav';

export default function TabLayout() {
  return (
    <Tabs 
      tabBar={() => <BottomNav />}
      screenOptions={{
        animation: 'fade', // React Navigation v7 이상에서 지원되는 탭 간 페이드 애니메이션
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="record" options={{ headerShown: false }} />
      <Tabs.Screen name="map" options={{ headerShown: false }} />
      <Tabs.Screen name="community" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
