import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. 안전 영역 훅 추가
import TopBar from '../../components/TopBar';

export default function Record() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // 2. 현재 기기의 여백 가져오기

  return (
    <View className="flex-1 bg-surface">
      {/* TopBar는 화면 상단에 고정된 상태로 유지됩니다. */}
      <TopBar />

      {/* 3. pt-32 pb-32를 지우고, contentContainerStyle을 통해 동적 패딩 적용 */}
      <ScrollView
        contentContainerClassName="px-6 mx-auto w-full max-w-md"
        contentContainerStyle={{
          paddingTop: insets.top + 70,    // 상단 여백: 상태바 + TopBar 높이
          paddingBottom: insets.bottom + 100 // 하단 여백: 홈바 + 하단 탭바 높이
        }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions (Vertical Cards) */}
        <View className="flex-col gap-4 mb-8">
          {/* Dietary Record */}
          <LinearGradient
            colors={['#004ac6', '#2563eb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="relative overflow-hidden p-6 rounded-2xl shadow-sm"
          >
            <View className="flex-row justify-between items-start mb-8">
              <View>
                <Text className="text-white text-xl font-bold font-headline mb-1">식단 기록</Text>
                <Text className="text-primary-fixed-dim text-sm">오늘의 영양 밸런스를 체크하세요</Text>
              </View>
              <View className="bg-white/20 p-2 rounded-xl">
                <MaterialIcons name="restaurant" size={24} color="white" />
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/diet')}
                className="bg-white px-5 py-2.5 rounded-xl flex-row items-center gap-2"
              >
                <Text className="text-primary font-bold">기록하기</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#004ac6" />
              </TouchableOpacity>
            </View>
            {/* Decorative element */}
            <View className="absolute -right-4 -bottom-4 opacity-10">
              <MaterialIcons name="restaurant" size={120} color="white" />
            </View>
          </LinearGradient>

          {/* Symptom Record */}
          <LinearGradient
            colors={['#00614b', '#007c60']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="relative overflow-hidden p-6 rounded-2xl shadow-sm"
          >
            <View className="flex-row justify-between items-start mb-8">
              <View>
                <Text className="text-white text-xl font-bold font-headline mb-1">증상 기록</Text>
                <Text className="text-tertiary-fixed text-sm opacity-80">몸의 작은 변화도 놓치지 마세요</Text>
              </View>
              <View className="bg-white/20 p-2 rounded-xl">
                <MaterialIcons name="favorite" size={24} color="white" />
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/diagnosis-log')}
                className="bg-white px-5 py-2.5 rounded-xl flex-row items-center gap-2"
              >
                <Text className="text-tertiary font-bold">기록하기</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#00614b" />
              </TouchableOpacity>
            </View>
            {/* Decorative element */}
            <View className="absolute -right-4 -bottom-4 opacity-10">
              <MaterialIcons name="medical-services" size={120} color="white" />
            </View>
          </LinearGradient>
        </View>

        {/* Wellness Insight Section */}
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 mb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="auto-awesome" size={20} color="#004ac6" />
              <Text className="text-lg font-bold font-headline text-slate-900">Wellness Insight</Text>
            </View>
          </View>
          <View className="flex-col gap-6">
            {/* Carbohydrates */}
            <View className="flex-col gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-medium text-secondary">탄수화물</Text>
                <Text className="text-sm font-medium text-on-surface">65g <Text className="text-slate-400">/ 120g</Text></Text>
              </View>
              <View className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden flex-row">
                <View className="h-full bg-primary-container rounded-full" style={{ width: '54%' }} />
              </View>
            </View>
            {/* Protein */}
            <View className="flex-col gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-medium text-secondary">단백질</Text>
                <Text className="text-sm font-medium text-on-surface">45g <Text className="text-slate-400">/ 80g</Text></Text>
              </View>
              <View className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden flex-row">
                <View className="h-full bg-tertiary-container rounded-full" style={{ width: '56%' }} />
              </View>
            </View>
            {/* Fat */}
            <View className="flex-col gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-medium text-secondary">지방</Text>
                <Text className="text-sm font-medium text-on-surface">22g <Text className="text-slate-400">/ 50g</Text></Text>
              </View>
              <View className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden flex-row">
                <View className="h-full bg-warning-orange rounded-full opacity-80" style={{ width: '44%' }} />
              </View>
            </View>
          </View>
        </View>

        {/* Today's Mission Section */}
        <View className="flex-col gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold font-headline text-slate-900">오늘의 기록 미션</Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-slate-400">전체보기</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-col gap-3">
            {/* Mission 1 */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-surface-container-low rounded-2xl" activeOpacity={0.7}>
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <MaterialIcons name="bedtime" size={24} color="#6366f1" />
                </View>
                <View>
                  <Text className="font-semibold text-slate-900">수면 기록하기</Text>
                  <Text className="text-xs text-primary font-medium tracking-tight mt-0.5">+50P 적립</Text>
                </View>
              </View>
              <View className="bg-warning-orange px-4 py-2 rounded-xl">
                <Text className="text-white text-sm font-bold">기록</Text>
              </View>
            </TouchableOpacity>

            {/* Mission 2 */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-surface-container-low rounded-2xl" activeOpacity={0.7}>
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <MaterialIcons name="fitness-center" size={24} color="#10b981" />
                </View>
                <View>
                  <Text className="font-semibold text-slate-900">운동 기록하기</Text>
                  <Text className="text-xs text-primary font-medium tracking-tight mt-0.5">+50P 적립</Text>
                </View>
              </View>
              <View className="bg-warning-orange px-4 py-2 rounded-xl">
                <Text className="text-white text-sm font-bold">기록</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}