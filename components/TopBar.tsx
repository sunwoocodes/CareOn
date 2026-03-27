import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native'; // Image 임포트 추가
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TopBarProps = {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  rightIcon?: string;
  userImageUrl?: string; // 프로필 이미지 URL 프롭 추가
};

export default function TopBar({
  title = "CareOn",
  showBack = false,
  showNotification = true,
  rightIcon,
  userImageUrl = "https://i.pravatar.cc/150?img=11" // 시안 확인용 임시 프로필 이미지
}: TopBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={100}
      tint="light"
      className="absolute top-0 left-0 w-full z-50 px-5 flex-row justify-between items-center bg-white/90 border-b border-slate-100"
      style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}
    >
      {/* 1. 좌측 영역 (뒤로가기 버튼 또는 프로필 이미지) */}
      <View className="w-10 items-start justify-center z-10">
        {showBack ? (
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/')} className="p-1 -ml-1 rounded-full" activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={26} color="#334155" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/profile')}>
            <Image
              source={{ uri: userImageUrl }}
              className="w-9 h-9 rounded-full bg-slate-200 border border-slate-200"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 2. 중앙 영역 (로고) - absolute로 양옆 아이콘 크기에 상관없이 항상 정중앙 고정 */}
      <View className="absolute left-0 right-0 items-center justify-center pointer-events-none" style={{ top: insets.top + 12, bottom: 12 }}>
        <Text className="font-headline font-extrabold text-[22px] tracking-tight" style={{ color: '#2563eb' }}>
          {title}
        </Text>
      </View>

      {/* 3. 우측 영역 (알림 또는 커스텀 아이콘) */}
      <View className="w-10 items-end justify-center z-10">
        {rightIcon ? (
          <TouchableOpacity className="p-1 -mr-1 rounded-full" activeOpacity={0.7}>
            <MaterialIcons name={rightIcon as any} size={26} color="#475569" />
          </TouchableOpacity>
        ) : showNotification ? (
          <TouchableOpacity className="p-1 -mr-1 rounded-full" activeOpacity={0.7}>
            {/* 시안처럼 꽉 찬 종 모양(notifications)으로 변경, 빨간 점 제거 */}
            <MaterialIcons name="notifications" size={26} color="#475569" />
          </TouchableOpacity>
        ) : null}
      </View>
    </BlurView>
  );
}