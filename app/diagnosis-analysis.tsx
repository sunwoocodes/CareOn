import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { G, Path, Circle } from 'react-native-svg';

export default function DiagnosisAnalysis() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface">
      {/* Top App Bar */}
      <BlurView intensity={80} tint="light" className="absolute top-0 z-50 w-full flex-row items-center justify-between px-6 bg-white/80 border-b border-surface-container" style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="p-2 -ml-2 rounded-full bg-slate-50">
            <MaterialIcons name="arrow-back" size={24} color="#004ac6" />
          </TouchableOpacity>
          <Text className="font-headline font-bold text-2xl tracking-tighter text-primary">CareOn</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} className="p-2 -mr-2 rounded-full">
          <MaterialIcons name="help-outline" size={24} color="#004ac6" />
        </TouchableOpacity>
      </BlurView>

      <ScrollView contentContainerClassName="px-6 max-w-2xl mx-auto w-full" style={{ paddingTop: insets.top + 80, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Personalized Greeting */}
        <View className="space-y-4 mb-8">
          <Text className="font-headline text-3xl font-bold tracking-tight text-on-surface leading-snug mb-4">
            선우님,{'\n'}어디가 불편하세요?
          </Text>
          <View className="relative justify-center">
            <View className="absolute left-4 z-10 flex items-center justify-center">
              <MaterialIcons name="search" size={20} color="#94a3b8" />
            </View>
            <TextInput 
              className="w-full bg-surface-container-high rounded-2xl py-4 pl-12 pr-4 text-slate-800 text-base" 
              placeholder="증상을 검색해보세요 (예: 두통, 속쓰림)" 
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* Body Map Visualization */}
        <View className="relative bg-surface-container-low rounded-3xl p-6 overflow-hidden flex-col items-center justify-center border border-slate-100 min-h-[400px] mb-8">
          {/* Radial Gradient approximation */}
          <View className="absolute inset-0 opacity-10" />
          
          <View className="absolute top-4 right-4 flex-col gap-2 z-10">
            <TouchableOpacity className="bg-white shadow-sm p-3 rounded-2xl border border-slate-50" activeOpacity={0.8}>
              <MaterialIcons name="zoom-in" size={20} color="#004ac6" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white shadow-sm p-3 rounded-2xl border border-slate-50" activeOpacity={0.8}>
              <MaterialIcons name="3d-rotation" size={20} color="#505f76" />
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
            
            <View className="absolute top-[8%] left-[70%] bg-surface-container-highest px-3 py-1.5 rounded-xl border border-slate-200 opacity-80">
              <Text className="text-xs font-bold text-on-surface">머리</Text>
            </View>
            <View className="absolute top-[28%] left-[5%] bg-white px-4 py-2 rounded-2xl shadow-sm flex-row items-center gap-1.5 border border-primary-container z-20">
              <MaterialIcons name="check-circle" size={14} color="#004ac6" />
              <Text className="text-sm font-bold text-on-surface">가슴/심장</Text>
            </View>
            <View className="absolute top-[48%] right-[2%] bg-surface-container-highest px-3 py-1.5 rounded-xl border border-slate-200 opacity-90">
              <Text className="text-xs font-bold text-on-surface">팔/어깨</Text>
            </View>
          </View>
          
          <View className="absolute bottom-6 bg-white/90 px-4 py-2 rounded-full border border-primary/20 shadow-sm flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 bg-primary rounded-full opacity-60" />
            <Text className="text-sm font-bold text-primary">가슴 영역 선택됨</Text>
          </View>
        </View>

        {/* Contextual Area Tabs */}
        <View className="flex-col gap-4 mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            <TouchableOpacity className="bg-primary px-5 py-2.5 rounded-full" activeOpacity={0.8}>
              <Text className="text-white text-sm font-bold">가슴</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full border border-slate-100" activeOpacity={0.8}>
              <Text className="text-secondary text-sm font-medium">머리</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full border border-slate-100" activeOpacity={0.8}>
              <Text className="text-secondary text-sm font-medium">팔/어깨</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface-container-low px-5 py-2.5 rounded-full border border-slate-100 items-center justify-center">
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
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl border border-slate-100">
              <Text className="text-on-surface text-sm font-medium">답답함</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl border border-slate-100">
              <Text className="text-on-surface text-sm font-medium">호흡곤란</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl border border-slate-100">
              <Text className="text-on-surface text-sm font-medium">저림</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pain Intensity Custom Slider using basic View trick or simple Text representation since slider is tricky in pure React Native without library */}
        <View className="bg-white rounded-3xl p-6 flex-col gap-6 shadow-sm border border-slate-100 mb-8">
          <View className="flex-row justify-between items-end">
            <Text className="text-sm font-bold text-secondary uppercase tracking-widest">통증 강도</Text>
            <View className="bg-primary px-3 py-1 rounded-lg">
              <Text className="text-white text-lg font-bold">7</Text>
            </View>
          </View>
          
          {/* Custom mock slider representation */}
          <View className="w-full h-3 rounded-full overflow-hidden flex-row">
            <View className="flex-1 bg-emerald-500"></View>
            <View className="flex-1 bg-yellow-400"></View>
            <View className="flex-[0.6] bg-error"></View>
            <View className="flex-[0.4] bg-slate-200"></View>
          </View>
          
          <View className="flex-row justify-between pt-1">
            <Text className="text-xs font-semibold text-slate-400">거의 없음</Text>
            <Text className="text-xs font-semibold text-slate-400">매우 심함</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-sm font-bold text-secondary uppercase tracking-widest">언제부터 시작되었나요?</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-100" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-on-surface mb-1">방금 전</Text>
              <Text className="text-xs text-secondary">최근 1시간 이내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-primary shadow-sm" activeOpacity={0.8}>
              <Text className="text-sm font-bold text-white mb-1">1~2일 전</Text>
              <Text className="text-xs text-blue-100">어제 또는 오늘 새벽</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-100" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-on-surface mb-1">3~7일 전</Text>
              <Text className="text-xs text-secondary">일주일 이내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-100" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-on-surface mb-1">1주 이상</Text>
              <Text className="text-xs text-secondary">만성적인 불편함</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="pt-8 pb-12 flex-col gap-6 border-t border-slate-100">
          <View className="flex-row items-center justify-center gap-2 bg-blue-50/50 py-3 rounded-2xl border border-blue-50">
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
      <View className="absolute right-6 z-40" style={{ bottom: 120 }}>
        <TouchableOpacity className="w-14 h-14 bg-primary rounded-full shadow-lg items-center justify-center" activeOpacity={0.8}>
          <MaterialIcons name="chat-bubble" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Sticky Action Button */}
      <View className="absolute bottom-0 w-full bg-white/90 px-6 pt-4 pb-8 z-50 border-t border-slate-100">
        <TouchableOpacity 
          className="w-full bg-primary-container py-4 rounded-2xl shadow-sm" 
          activeOpacity={0.8}
          onPress={() => router.push('/diagnosis')}
        >
          <Text className="text-white font-bold text-lg text-center">AI 분석 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
