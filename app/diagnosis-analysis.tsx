import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { G, Path, Circle } from 'react-native-svg';
import TopBar from '../components/TopBar';

export default function DiagnosisAnalysis() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50 overflow-hidden">
      <TopBar showBack={true} showNotification={false} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -right-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 160,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Personalized Greeting */}
        <View className="mb-8">
          <Text className="text-3xl font-extrabold tracking-tight text-slate-900 leading-snug mb-4">
            선우님,{'\n'}어디가 불편하세요?
          </Text>
          <View className="relative justify-center">
            <View className="absolute left-4 z-10 flex items-center justify-center">
              <MaterialIcons name="search" size={20} color="#94a3b8" />
            </View>
            <TextInput
              className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-slate-800 text-base border border-slate-200"
              placeholder="증상을 검색해보세요 (예: 두통, 속쓰림)"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* Body Map Visualization */}
        <View className="relative bg-white rounded-[32px] p-6 overflow-hidden flex-col items-center justify-center border border-slate-100 min-h-[400px] mb-8 shadow-md"
          style={{ shadowColor: '#2563eb', shadowOpacity: 0.08, shadowRadius: 25 }}>
          <View className="absolute top-4 right-4 flex-col gap-2 z-10">
            <TouchableOpacity className="bg-slate-100 p-3 rounded-2xl border border-slate-200" activeOpacity={0.8}>
              <MaterialIcons name="zoom-in" size={20} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-slate-100 p-3 rounded-2xl border border-slate-200" activeOpacity={0.8}>
              <MaterialIcons name="3d-rotation" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View className="relative w-full h-[360px] max-w-[300px] flex items-center justify-center">
            <Svg className="w-full h-full" viewBox="0 0 240 540">
              <G fill="#e0e3e5">
                <Path d="M120 15 C140 15 155 30 155 50 C155 70 140 85 120 85 C100 85 85 70 85 50 C85 30 100 15 120 15" />
                <Path d="M85 90 L155 90 C175 90 185 105 185 125 L180 260 L120 270 L60 260 L55 125 C55 105 65 90 85 90" />
                <Path d="M55 125 L40 280 C38 300 50 305 55 285 L65 140" />
                <Path d="M40 285 L35 400 C33 420 45 420 50 400 L55 285" />
                <Path d="M185 125 L200 280 C202 300 190 305 185 285 L175 140" />
                <Path d="M200 285 L205 400 C207 420 195 420 190 400 L185 285" />
                <Path d="M70 265 L115 265 L110 400 L105 520 L80 520 L85 400 Z" />
                <Path d="M125 265 L170 265 L155 400 L160 520 L135 520 L130 400 Z" />
              </G>
              <Circle cx="120" cy="50" fill="transparent" r="35" />
              <Path d="M85 90 L155 90 L155 180 L85 180 Z" fill="#2563EB" fillOpacity="0.3" />
              <Circle cx="120" cy="135" fill="#2563EB" r="6" />
              <Path d="M55 125 L35 400 L55 400 L65 125 Z" fill="transparent" />
              <Path d="M185 125 L205 400 L185 400 L175 125 Z" fill="transparent" />
              <Path d="M85 180 L155 180 L160 265 L80 265 Z" fill="transparent" />
              <Path d="M70 265 L115 265 L105 520 L80 520 Z" fill="transparent" />
              <Path d="M125 265 L170 265 L160 520 L135 520 Z" fill="transparent" />
            </Svg>

            <View className="absolute top-[8%] left-[70%] bg-white px-3 py-1.5 rounded-xl border border-slate-200 opacity-80">
              <Text className="text-xs font-bold text-slate-900">머리</Text>
            </View>
            <View className="absolute top-[28%] left-[5%] bg-white px-4 py-2 rounded-2xl shadow-sm flex-row items-center gap-1.5 border border-blue-100 z-20">
              <MaterialIcons name="check-circle" size={14} color="#2563eb" />
              <Text className="text-sm font-bold text-slate-900">가슴/심장</Text>
            </View>
            <View className="absolute top-[48%] right-[2%] bg-white px-3 py-1.5 rounded-xl border border-slate-200 opacity-90">
              <Text className="text-xs font-bold text-slate-900">팔/어깨</Text>
            </View>
          </View>

          <View className="absolute bottom-6 bg-white/90 px-4 py-2 rounded-full border border-blue-100 shadow-sm flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 bg-blue-600 rounded-full opacity-60" />
            <Text className="text-sm font-bold text-blue-600">가슴 영역 선택됨</Text>
          </View>
        </View>

        {/* Contextual Area Tabs */}
        <View className="flex-col gap-4 mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            <TouchableOpacity className="bg-blue-600 px-5 py-2.5 rounded-full" activeOpacity={0.8}>
              <Text className="text-white text-sm font-bold">가슴</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full border border-slate-200" activeOpacity={0.8}>
              <Text className="text-slate-600 text-sm font-medium">머리</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full border border-slate-200" activeOpacity={0.8}>
              <Text className="text-slate-600 text-sm font-medium">팔/어깨</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200 items-center justify-center">
              <MaterialIcons name="add" size={18} color="#94a3b8" />
            </TouchableOpacity>
          </ScrollView>
          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
              <Text className="text-blue-700 text-sm font-semibold">통증</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
              <Text className="text-blue-700 text-sm font-semibold">압박감</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl border border-slate-200">
              <Text className="text-slate-800 text-sm font-medium">답답함</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl border border-slate-200">
              <Text className="text-slate-800 text-sm font-medium">호흡곤란</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl border border-slate-200">
              <Text className="text-slate-800 text-sm font-medium">저림</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pain Intensity */}
        <View className="bg-white rounded-[32px] p-6 flex-col gap-6 shadow-md border border-slate-50 mb-8"
          style={{ shadowColor: '#2563eb', shadowOpacity: 0.08, shadowRadius: 25 }}>
          <View className="flex-row justify-between items-end">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">통증 강도</Text>
            <View className="bg-blue-600 px-3 py-1 rounded-lg">
              <Text className="text-white text-lg font-bold">7</Text>
            </View>
          </View>
          <View className="w-full h-3 rounded-full overflow-hidden flex-row">
            <View className="flex-1 bg-emerald-500" />
            <View className="flex-1 bg-amber-400" />
            <View className="flex-[0.6] bg-red-500" />
            <View className="flex-[0.4] bg-slate-200" />
          </View>
          <View className="flex-row justify-between pt-1">
            <Text className="text-xs font-semibold text-slate-400">거의 없음</Text>
            <Text className="text-xs font-semibold text-slate-400">매우 심함</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">언제부터 시작되었나요?</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-slate-900 mb-1">방금 전</Text>
              <Text className="text-xs text-slate-500">최근 1시간 이내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-blue-600 shadow-md" activeOpacity={0.8}>
              <Text className="text-sm font-bold text-white mb-1">1~2일 전</Text>
              <Text className="text-xs text-blue-100">어제 또는 오늘 새벽</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-slate-900 mb-1">3~7일 전</Text>
              <Text className="text-xs text-slate-500">일주일 이내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-slate-900 mb-1">1주 이상</Text>
              <Text className="text-xs text-slate-500">만성적인 불편함</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="pt-8 pb-12 flex-col gap-6 border-t border-slate-100">
          <View className="flex-row items-center justify-center gap-2 bg-blue-50 py-3 rounded-2xl border border-blue-100">
            <MaterialIcons name="lock-outline" size={14} color="#2563eb" />
            <Text className="text-xs font-medium text-slate-600">선우님의 건강 데이터는 <Text className="text-blue-600 font-bold">암호화</Text> 기술로 보호됩니다</Text>
          </View>
          <View className="px-2">
            <Text className="text-[10px] leading-relaxed text-slate-400 text-center">
              본 서비스는 증상에 대한 참고용 정보를 제공하며, 실제 의사의 진단을 대신할 수 없습니다.{'\n'}위급 상황 발생 시 즉시 <Text className="font-bold text-slate-500">119</Text> 또는 가까운 응급실을 방문하시기 바랍니다.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute right-6 z-40" style={{ bottom: insets.bottom + 120 }}>
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ shadowColor: '#2563eb', shadowOpacity: 0.4, shadowRadius: 12 }}
          >
            <MaterialIcons name="chat-bubble" size={22} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Sticky Action Button */}
      <View className="absolute bottom-0 w-full bg-white/95 px-6 pt-4 z-50 border-t border-slate-100"
        style={{ paddingBottom: insets.bottom + 12 }}>
        <TouchableOpacity
          className="w-full py-4 rounded-2xl items-center justify-center shadow-sm"
          activeOpacity={0.8}
          onPress={() => router.push('/diagnosis')}
        >
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            className="absolute inset-0 rounded-2xl"
          />
          <Text className="text-white font-bold text-lg">AI 분석 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
