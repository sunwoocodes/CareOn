import { Tabs } from 'expo-router';
import BottomNav from '../../components/BottomNav';

export default function TabLayout() {
  return (
    <Tabs tabBar={() => <BottomNav />}>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="record" options={{ headerShown: false }} />
      <Tabs.Screen name="map" options={{ headerShown: false }} />
      <Tabs.Screen name="community" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
