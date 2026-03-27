import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. 안전 영역 훅 추가

type BottomNavProps = {
  activeTab?: string;
  hide?: boolean;
};

export default function BottomNav({ activeTab, hide }: BottomNavProps) {
  const router = useRouter();
  const path = usePathname();
  const insets = useSafeAreaInsets(); // 2. 현재 기기의 하단 여백(홈바 등) 높이 가져오기

  if (hide) return null;

  const items = [
    { to: '/', name: 'index', icon: 'home', label: '홈' },
    { to: '/record', name: 'record', icon: 'edit-note', label: '기록' },
    { to: '/map', name: 'map', icon: 'map', label: '지도' },
    { to: '/community', name: 'community', icon: 'groups', label: '커뮤니티' },
    { to: '/profile', name: 'profile', icon: 'person', label: '내 정보' },
  ];

  return (
    <View className="absolute bottom-0 left-0 w-full z-50 rounded-t-3xl overflow-hidden shadow-sm border-t border-slate-100">
      <BlurView
        intensity={80}
        tint="light"
        // 3. 기존의 pb-8 (고정 아래 여백)을 지웁니다.
        className="flex-row justify-around items-center px-2 pt-4 bg-white/80"
        // 4. 기기 하단 안전 영역 높이에 기본 여백(12px)을 더해서 패딩을 줍니다.
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        {items.map((item) => {
          const isActive = activeTab ? activeTab === item.to : path === item.to;
          return (
            <TouchableOpacity
              key={item.to}
              onPress={() => router.replace(item.to as any)}
              className="items-center px-3 py-1"
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={isActive ? '#004ac6' : '#94a3b8'}
              />
              <Text className={`font-body text-[10px] font-bold mt-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}