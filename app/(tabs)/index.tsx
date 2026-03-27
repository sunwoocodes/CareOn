import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. 안전 영역 훅 추가
import Svg, { Circle } from 'react-native-svg';
import TopBar from '../../components/TopBar';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // 2. 현재 기기의 상태바 높이 가져오기

  return (
    <View className="flex-1 bg-surface">
      <TopBar title="CareOn" />

      {/* 3. pt-32 pb-32를 지우고, contentContainerStyle을 이용해 동적 패딩 적용 */}
      <ScrollView
        contentContainerClassName="px-5 mx-auto w-full max-w-md"
        contentContainerStyle={{
          paddingTop: insets.top + 70, // 상태바 높이 + TopBar 내용물 높이 여백
          paddingBottom: insets.bottom + 100 // 하단 홈바(아이폰) 및 플로팅 버튼을 피하기 위한 여백
        }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section: Health Score */}
        <View className="relative bg-white rounded-3xl p-8 flex-col items-center justify-center border border-slate-100 shadow-sm mb-7">
          <Text className="font-headline font-bold text-lg mb-6 text-on-surface">선우님, 오늘 컨디션은 최고예요!</Text>

          {/* Circular Progress Ring */}
          <View className="relative w-48 h-48 items-center justify-center mb-6">
            <Svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
              <Circle cx="96" cy="96" fill="transparent" r="88" stroke="#eceef0" strokeWidth="12" />
              <Circle cx="96" cy="96" fill="transparent" r="88" stroke="#00614b" strokeDasharray="552.92" strokeDashoffset="82.94" strokeLinecap="round" strokeWidth="12" />
            </Svg>
            <View className="absolute inset-0 flex-col items-center justify-center">
              <Text className="font-headline font-extrabold text-5xl tracking-tight text-on-surface">85</Text>
              <Text className="font-label font-bold text-tertiary tracking-widest text-sm mt-1">GREAT</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-sm">
            <MaterialIcons name="trending-up" size={18} color="#00614b" />
            <Text className="text-sm font-bold text-tertiary">어제보다 +3점 상승</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-4 mb-7">
          {/* Meal Record */}
          <TouchableOpacity
            onPress={() => router.push('/diet')}
            className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-slate-50 flex-col gap-3"
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 rounded-2xl bg-orange-50 items-center justify-center">
              <MaterialIcons name="restaurant" size={20} color="#f97316" />
            </View>
            <View>
              <Text className="font-headline font-bold text-on-surface">식단 기록</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Text className="font-label text-xs font-bold text-orange-600">기록하기</Text>
                <MaterialIcons name="arrow-forward" size={12} color="#ea580c" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Symptom Check */}
          <TouchableOpacity
            onPress={() => router.push('/diagnosis-analysis')}
            className="flex-1 bg-white rounded-3xl p-5 shadow-sm border-2 border-primary-fixed-dim flex-col gap-3"
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center">
              <MaterialIcons name="medical-services" size={20} color="#3b82f6" />
            </View>
            <View>
              <Text className="font-headline font-bold text-on-surface">증상 체크</Text>
              <Text className="font-label text-xs font-semibold text-slate-400 mt-1">최근 2일 전</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Wellness Insight Card */}
        <View className="bg-surface-container-low rounded-3xl p-6 shadow-sm relative overflow-hidden mb-7">
          <View className="absolute top-4 right-4">
            <MaterialIcons name="auto-awesome" size={30} color="#cbd5e1" />
          </View>
          <View className="relative z-10 flex-col gap-4">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="insights" size={20} color="#004ac6" />
              <Text className="font-headline font-bold text-on-surface">Wellness Insight</Text>
            </View>
            <Text className="font-headline font-extrabold text-xl text-on-surface leading-tight">영양 균형이 매우 안정적입니다</Text>

            <View className="flex-col gap-3 pt-2">
              {/* Carb */}
              <View className="flex-col gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[11px] font-bold text-on-surface-variant">탄수화물</Text>
                  <Text className="text-[11px] font-bold text-on-surface-variant">45%</Text>
                </View>
                <View className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }} />
                </View>
              </View>
              {/* Protein */}
              <View className="flex-col gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[11px] font-bold text-on-surface-variant">단백질</Text>
                  <Text className="text-[11px] font-bold text-on-surface-variant">35%</Text>
                </View>
                <View className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }} />
                </View>
              </View>
              {/* Fat */}
              <View className="flex-col gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[11px] font-bold text-on-surface-variant">지방</Text>
                  <Text className="text-[11px] font-bold text-on-surface-variant">20%</Text>
                </View>
                <View className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-rose-400 rounded-full" style={{ width: '20%' }} />
                </View>
              </View>
              <Text className="text-secondary text-xs leading-relaxed mt-4">단백질 섭취량이 목표 대비 12% 높습니다. 현재의 균형 잡힌 식단을 유지하세요.</Text>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View className="flex-col gap-5">
          <View className="flex-row items-center justify-between">
            <Text className="font-headline font-bold text-on-surface text-lg">오늘의 활동</Text>
            <TouchableOpacity className="px-3 py-1 bg-primary/5 rounded-full">
              <Text className="text-primary font-bold text-sm">전체보기</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4 relative">
            {/* Native Vertical Line */}
            <View className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-surface-container" />

            {/* Activity 1 */}
            <View className="flex-row items-start gap-4 z-10">
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
                <MaterialIcons name="directions-walk" size={20} color="#004ac6" />
              </View>
              <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-50">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-bold text-on-surface">오전 산책</Text>
                  <Text className="text-[11px] font-bold text-slate-400">08:30 AM</Text>
                </View>
                <Text className="text-xs text-secondary leading-relaxed">35분간 유산소 운동</Text>
              </View>
            </View>

            {/* Activity 2 */}
            <View className="flex-row items-start gap-4 z-10">
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
                <MaterialIcons name="medical-services" size={20} color="#00614b" />
              </View>
              <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-50">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-bold text-on-surface">영양제 섭취</Text>
                  <Text className="text-[11px] font-bold text-slate-400">09:15 AM</Text>
                </View>
                <Text className="text-xs text-secondary leading-relaxed">멀티비타민 및 오메가3</Text>
              </View>
            </View>

            {/* Activity 3 */}
            <View className="flex-row items-start gap-4 z-10">
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
                <MaterialIcons name="bedtime" size={20} color="#6366f1" />
              </View>
              <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-50">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-bold text-on-surface">수면 데이터</Text>
                  <Text className="text-[11px] font-bold text-slate-400">07:00 AM</Text>
                </View>
                <Text className="text-xs text-secondary leading-relaxed">6시간 45분 숙면</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 4. 플로팅 버튼(FAB) 위치도 기기 하단 여백에 맞춰 동적으로 조정 */}
      <View className="absolute right-6 z-40" style={{ bottom: insets.bottom + 90 }}>
        <TouchableOpacity className="w-14 h-14 rounded-full bg-primary-container shadow-md items-center justify-center" activeOpacity={0.8}>
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}