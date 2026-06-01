import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { Animated, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View, Modal, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import TopBar from '../components/TopBar';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DiagnosisAnalysis() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const revealAnim = useRef(new Animated.Value(0)).current;
  const magXAnim = useRef(new Animated.Value(0)).current;
  const magYAnim = useRef(new Animated.Value(0)).current;
  const randomInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnalysis = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    
    revealAnim.setValue(0);
    magXAnim.setValue(0);
    magYAnim.setValue(0);

    // Continuous fluid random motion using spring updates
    randomInterval.current = setInterval(() => {
      const randomX = (Math.random() - 0.5) * 140;
      const randomY = (Math.random() - 0.5) * 140;
      
      Animated.spring(magXAnim, {
        toValue: randomX,
        friction: 40,
        tension: 15,
        useNativeDriver: true
      }).start();
      
      Animated.spring(magYAnim, {
        toValue: randomY,
        friction: 40,
        tension: 15,
        useNativeDriver: true
      }).start();
    }, 800); // Redirect towards a new target every 800ms before it stops

    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      if (randomInterval.current) clearInterval(randomInterval.current);
      setIsAnalyzing(false);
      magXAnim.stopAnimation();
      magYAnim.stopAnimation();
      router.push('/diagnosis');
    }, 3000);
  };

  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState<number>(7);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const isFormValid = selectedParts.length > 0 && 
                      selectedSymptoms.length > 0 && 
                      selectedTime !== '' && 
                      details.trim().length > 0;

  const togglePart = (part: string) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
      delete: { type: LayoutAnimation.Types.easeOut, property: LayoutAnimation.Properties.opacity },
    });
    setSelectedParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const partNames: Record<string, string> = {
    head: '머리',
    chest: '가슴/심장',
    abdomen: '복부',
    left_upper_arm: '왼쪽 위팔',
    left_elbow: '왼쪽 팔꿈치',
    left_forearm: '왼쪽 아래팔',
    left_hand: '왼손',
    right_upper_arm: '오른쪽 위팔',
    right_elbow: '오른쪽 팔꿈치',
    right_forearm: '오른쪽 아래팔',
    right_hand: '오른손',
    left_thigh: '왼쪽 허벅지',
    right_thigh: '오른쪽 허벅지',
    left_knee: '왼쪽 무릎',
    right_knee: '오른쪽 무릎',
    left_calf: '왼쪽 종아리',
    right_calf: '오른쪽 종아리',
    left_foot: '왼쪽 발',
    right_foot: '오른쪽 발'
  };

  const symptomToPartMap: { [key: string]: string[] } = {
    '두통': ['head'], '어지러움': ['head'], '발열': ['head'], '이명': ['head'], '시야 흐림': ['head'],
    '가슴 통증': ['chest'], '답답함': ['chest'], '호흡곤란': ['chest'], '두근거림': ['chest'], '기침': ['chest'],
    '복통': ['abdomen'], '소화불량': ['abdomen'], '메스꺼움': ['abdomen'], '속쓰림': ['abdomen'], '설사': ['abdomen'],
    '어깨/팔 통증': ['left_upper_arm', 'right_upper_arm'], '어깨 통증': ['left_upper_arm', 'right_upper_arm'], 
    '팔 저림': ['left_forearm', 'right_forearm'], '근육통': ['left_upper_arm', 'right_upper_arm', 'left_thigh', 'right_thigh'], 
    '손 떨림': ['left_hand', 'right_hand'], '관절 뻣뻣함': ['left_elbow', 'right_elbow'],
    '다리/무릎 통증': ['left_knee', 'right_knee'], '무릎 통증': ['left_knee', 'right_knee'], 
    '다리 붓기': ['left_calf', 'right_calf'], '근육 경련': ['left_calf', 'right_calf'], 
    '발저림': ['left_foot', 'right_foot'], '보행 불편': ['left_foot', 'right_foot']
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    const query = searchText.trim();
    
    let foundParts: string[] = [];
    let foundSymptom: string | null = null;
    
    Object.entries(symptomToPartMap).forEach(([symptom, parts]) => {
      if (symptom.includes(query) || query.includes(symptom)) {
        foundParts = [...foundParts, ...parts];
        foundSymptom = symptom;
      }
    });

    if (foundParts.length > 0 && foundSymptom) {
      setSelectedParts(prev => Array.from(new Set([...prev, ...foundParts])));
      setSelectedSymptoms(prev => Array.from(new Set([...prev, foundSymptom!])));
      setSearchText('');
    }
  };

  const getRelatedSymptoms = (parts: string[]) => {
    if (parts.length === 0) {
      return ['통증', '저림', '부종', '발열', '피로감'];
    }

    const symptoms = new Set<string>();
    
    parts.forEach(part => {
      if (part === 'head') {
        ['두통', '어지러움', '발열', '이명', '시야 흐림'].forEach(s => symptoms.add(s));
      } else if (part === 'chest') {
        ['가슴 통증', '답답함', '호흡곤란', '두근거림', '기침'].forEach(s => symptoms.add(s));
      } else if (part === 'abdomen') {
        ['복통', '소화불량', '메스꺼움', '속쓰림', '설사'].forEach(s => symptoms.add(s));
      } else if (part.includes('arm') || part.includes('elbow') || part.includes('hand') || part.includes('forearm') || part.includes('shoulder')) {
        ['어깨/팔 통증', '팔 저림', '근육통', '손 떨림', '관절 뻣뻣함'].forEach(s => symptoms.add(s));
      } else if (part.includes('thigh') || part.includes('knee') || part.includes('calf') || part.includes('foot')) {
        ['다리/무릎 통증', '다리 붓기', '근육 경련', '발저림', '보행 불편'].forEach(s => symptoms.add(s));
      }
    });

    return Array.from(symptoms);
  };

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      {/* 배경 그라디언트 */}
      <LinearGradient
        colors={['#fff0f5', '#efe5ff', '#e5f0ff', '#efe5ff']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill} />
      <TopBar showBack={true} showNotification={false} scrollY={scrollY} />

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 82,
          paddingBottom: insets.bottom + 160,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Personalized Greeting */}
        <View className="mb-8">
          <Text className="text-3xl font-extrabold tracking-tight text-slate-900 leading-snug mb-4">
            푸앙님,{'\n'}어디가 불편하세요?
          </Text>
          <View className="relative justify-center">
            <TextInput
              className="w-full bg-white rounded-2xl py-4 pl-5 pr-16 text-slate-800 text-base border border-slate-200 shadow-sm"
              placeholder="증상을 검색해보세요 (예: 두통, 속쓰림)"
              placeholderTextColor="#94a3b8"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity 
              className="absolute right-2 top-2 bottom-2 w-12 bg-blue-50 rounded-xl items-center justify-center border border-blue-100"
              activeOpacity={0.8}
              onPress={handleSearch}
            >
              <MaterialIcons name="search" size={24} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body Map Visualization */}
        <View style={dStyles.bodyCard}>
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
              {/* Head */}
              <Circle cx="120" cy="70" r="32" fill={selectedParts.includes('head') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('head')} />

              {/* Chest */}
              <Path d="M 98 125 L 142 125 A 20 20 0 0 1 162 145 L 162 200 L 78 200 L 78 145 A 20 20 0 0 1 98 125 Z" fill={selectedParts.includes('chest') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('chest')} />

              {/* Abdomen */}
              <Rect x="78" y="200" width="84" height="80" rx="10" fill={selectedParts.includes('abdomen') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('abdomen')} />

              {/* === 왼쪽 팔 분할 === */}
              {/* Left Upper Arm */}
              <Rect x="42" y="132" width="24" height="50" rx="12" fill={selectedParts.includes('left_upper_arm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_upper_arm')} />

              {/* Left Elbow */}
              <Rect x="42" y="182" width="24" height="20" rx="8" fill={selectedParts.includes('left_elbow') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_elbow')} />

              {/* Left Forearm */}
              <Rect x="42" y="202" width="24" height="45" rx="12" fill={selectedParts.includes('left_forearm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_forearm')} />

              {/* Left Hand */}
              <Rect x="40" y="247" width="28" height="20" rx="6" fill={selectedParts.includes('left_hand') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_hand')} />

              {/* === 오른쪽 팔 분할 === */}
              {/* Right Upper Arm */}
              <Rect x="174" y="132" width="24" height="50" rx="12" fill={selectedParts.includes('right_upper_arm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_upper_arm')} />

              {/* Right Elbow */}
              <Rect x="174" y="182" width="24" height="20" rx="8" fill={selectedParts.includes('right_elbow') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_elbow')} />

              {/* Right Forearm */}
              <Rect x="174" y="202" width="24" height="45" rx="12" fill={selectedParts.includes('right_forearm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_forearm')} />

              {/* Right Hand */}
              <Rect x="172" y="247" width="28" height="20" rx="6" fill={selectedParts.includes('right_hand') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_hand')} />

              {/* === 다리 분할 === */}
              {/* Left Thigh (허벅지) */}
              <Rect x="78" y="280" width="28" height="80" rx="10" fill={selectedParts.includes('left_thigh') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_thigh')} />

              {/* Right Thigh */}
              <Rect x="134" y="280" width="28" height="80" rx="10" fill={selectedParts.includes('right_thigh') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_thigh')} />

              {/* Left Knee */}
              <Rect x="78" y="360" width="28" height="25" rx="8" fill={selectedParts.includes('left_knee') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_knee')} />

              {/* Right Knee */}
              <Rect x="134" y="360" width="28" height="25" rx="8" fill={selectedParts.includes('right_knee') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_knee')} />

              {/* Left Calf (종아리) */}
              <Rect x="78" y="385" width="28" height="60" rx="10" fill={selectedParts.includes('left_calf') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_calf')} />

              {/* Right Calf */}
              <Rect x="134" y="385" width="28" height="60" rx="10" fill={selectedParts.includes('right_calf') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_calf')} />

              {/* Left Foot */}
              <Rect x="75" y="445" width="34" height="15" rx="5" fill={selectedParts.includes('left_foot') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_foot')} />

              {/* Right Foot */}
              <Rect x="131" y="445" width="34" height="15" rx="5" fill={selectedParts.includes('right_foot') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_foot')} />
            </Svg>
          </View>

          <View pointerEvents="none" className="absolute bottom-6 bg-white/90 px-4 py-2 rounded-full border border-blue-100 shadow-sm flex-row items-center gap-2">
            <View className={`w-2.5 h-2.5 rounded-full ${selectedParts.length > 0 ? 'bg-blue-600 opacity-60' : 'bg-slate-300'}`} />
            <Text className={`text-sm font-bold ${selectedParts.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
              {selectedParts.length > 0
                ? (selectedParts.length === 1 ? `${partNames[selectedParts[0]]} 영역 선택됨` : `${partNames[selectedParts[0]]} 외 ${selectedParts.length - 1}곳 선택됨`)
                : '선택된 영역 없음'}
            </Text>
          </View>
        </View>

        {/* Contextual Area Tabs */}
        <View className="flex-col gap-6 mb-8 mt-2">
          {/* Selected Areas */}
          <View className="flex-col gap-3">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">선택된 부위</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {selectedParts.length === 0 ? (
                <View className="rounded-full shadow-sm overflow-hidden" style={{ shadowColor: '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } }}>
                  <LinearGradient colors={['#ffffff', '#f1f5f9']} className="px-5 py-3 rounded-full border border-slate-200">
                    <Text className="text-slate-400 text-sm font-medium">부위를 터치하여 선택해주세요</Text>
                  </LinearGradient>
                </View>
              ) : (
                selectedParts.map(part => (
                  <TouchableOpacity
                    key={part}
                    activeOpacity={0.8}
                    onPress={() => togglePart(part)}
                    className="rounded-full shadow-sm"
                    style={{ shadowColor: '#2563eb', shadowOpacity: 0.25, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
                  >
                    <LinearGradient
                      colors={['#60a5fa', '#3b82f6', '#2563eb']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      className="px-5 py-3 rounded-full flex-row items-center gap-1.5 border border-blue-400"
                    >
                      <Text className="text-white text-sm font-bold">{partNames[part]}</Text>
                      <MaterialIcons name="close" size={16} color="#dbeafe" />
                    </LinearGradient>
                  </TouchableOpacity>
                ))
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                className="rounded-full shadow-sm"
                style={{ shadowColor: '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
              >
                <LinearGradient colors={['#ffffff', '#f8fafc']} className="px-5 py-3 rounded-full border border-slate-200 items-center justify-center">
                  <MaterialIcons name="add" size={18} color="#64748b" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Symptoms */}
          <View className="flex-col gap-3">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">주요 증상</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {selectedParts.length === 0 ? (
                <View className="rounded-full shadow-sm overflow-hidden" style={{ shadowColor: '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } }}>
                  <LinearGradient colors={['#ffffff', '#f1f5f9']} className="px-5 py-3 rounded-full border border-slate-200">
                    <Text className="text-slate-400 text-sm font-medium">부위를 터치하여 선택해주세요</Text>
                  </LinearGradient>
                </View>
              ) : (
                getRelatedSymptoms(selectedParts).map(symptom => {
                  const isSelected = selectedSymptoms.includes(symptom);
                  return (
                  <TouchableOpacity
                    key={symptom}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom])}
                    className="rounded-full shadow-sm"
                    style={{ shadowColor: isSelected ? '#3b82f6' : '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
                  >
                    <LinearGradient
                      colors={isSelected ? ['#eff6ff', '#dbeafe', '#bfdbfe'] : ['#ffffff', '#f8fafc', '#f1f5f9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      className={`px-5 py-3 rounded-full border ${isSelected ? 'border-blue-200' : 'border-slate-200'}`}
                    >
                      <Text className={`text-sm font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                        {symptom}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )})
              )}
            </View>
          </View>
        </View>

        {/* Pain Intensity */}
        <View style={dStyles.sectionCard}>
          <View className="flex-row justify-between items-end">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">통증 강도</Text>
            <View className={`${painLevel <= 3 ? 'bg-emerald-500' : painLevel <= 7 ? 'bg-amber-500' : 'bg-red-500'} px-3 py-1 rounded-lg`}>
              <Text className="text-white text-lg font-bold">{painLevel}</Text>
            </View>
          </View>
          <View className="w-full justify-center -mx-2 mt-2">
            <Slider
              style={{ width: '108%', height: 40 }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={painLevel}
              onValueChange={(val) => setPainLevel(val)}
              minimumTrackTintColor={painLevel <= 3 ? '#10b981' : painLevel <= 7 ? '#f59e0b' : '#ef4444'}
              maximumTrackTintColor="#e2e8f0"
              thumbTintColor={painLevel <= 3 ? '#10b981' : painLevel <= 7 ? '#f59e0b' : '#ef4444'}
            />
          </View>
          <View className="flex-row justify-between -mt-1">
            <Text className="text-xs font-semibold text-slate-400">거의 없음</Text>
            <Text className="text-xs font-semibold text-slate-400">매우 심함</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">언제부터 시작되었나요?</Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              { id: 'just_now', title: '방금 전', desc: '최근 1시간 이내' },
              { id: '1_2_days', title: '1~2일 전', desc: '어제 또는 오늘 새벽' },
              { id: '3_7_days', title: '3~7일 전', desc: '일주일 이내' },
              { id: '1_week_plus', title: '1주 이상', desc: '만성적인 불편함' }
            ].map(time => {
              const isSelected = selectedTime === time.id;
              return (
              <TouchableOpacity 
                key={time.id}
                className={`w-[48%] p-4 rounded-2xl ${isSelected ? 'bg-blue-600 shadow-md' : 'bg-white border border-slate-200 shadow-sm'}`} 
                activeOpacity={0.7}
                onPress={() => setSelectedTime(time.id)}
              >
                <Text className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>{time.title}</Text>
                <Text className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>{time.desc}</Text>
              </TouchableOpacity>
            )})}
          </View>
          
          {/* 상세 입력 (추가됨) */}
          <TextInput
            className="w-full bg-white rounded-2xl p-4 text-slate-800 text-sm border border-slate-200 shadow-sm mt-1 min-h-[100px]"
            placeholder="상세한 증상 발생 시점이나 상황을 적어주세요.&#10;(예: 어제 저녁 식사 후부터 명치가 답답해요)"
            placeholderTextColor="#94a3b8"
            multiline={true}
            textAlignVertical="top"
            value={details}
            onChangeText={setDetails}
          />
        </View>

        {/* Footer */}
        <View className="pt-8 pb-12 flex-col gap-6 border-t border-slate-100">
          <View className="flex-row items-center justify-center gap-2 bg-blue-50 py-3 rounded-2xl border border-blue-100">
            <MaterialIcons name="lock-outline" size={14} color="#2563eb" />
            <Text className="text-xs font-medium text-slate-600">푸앙님의 건강 데이터는 <Text className="text-blue-600 font-bold">암호화</Text> 기술로 보호됩니다</Text>
          </View>
          <View className="px-4 py-4 bg-rose-50 rounded-2xl border border-rose-100 flex-row items-start gap-3">
            <MaterialIcons name="error-outline" size={18} color="#e11d48" style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-xs leading-relaxed text-rose-800">
                본 서비스는 증상에 대한 <Text className="font-bold text-rose-900">참고용 정보</Text>를 제공하며, 실제 의사의 진단을 대신할 수 없습니다. 위급 상황 발생 시 즉시 <Text className="font-bold text-rose-900">119</Text> 또는 가까운 <Text className="font-bold text-rose-900">응급실</Text>을 방문하시기 바랍니다.
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

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
      <View style={[dStyles.stickyBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          className={`w-full py-4 rounded-2xl items-center justify-center shadow-sm ${!isFormValid ? 'opacity-50' : ''}`}
          activeOpacity={isFormValid ? 0.8 : 1}
          onPress={isFormValid ? startAnalysis : undefined}
        >
          <LinearGradient
            colors={isFormValid ? ['#2563eb', '#1d4ed8'] : ['#94a3b8', '#64748b']}
            className="absolute inset-0 rounded-2xl"
          />
          <Text className="text-white font-bold text-lg">
            {isFormValid ? 'AI 분석 시작하기' : '모든 항목을 입력해주세요'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* AI Analysis Loading Modal */}
      <Modal visible={isAnalyzing} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.95)', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: '900', color: '#1e293b', marginBottom: 60, letterSpacing: -0.5 }}>AI 분석 중...</Text>
          
          <View style={{ width: 160, height: 160, justifyContent: 'center', alignItems: 'center' }}>
            {/* Base Logo (Faded outline) */}
            <MaterialIcons name="health-and-safety" size={140} color="rgba(37,99,235,0.1)" style={{ position: 'absolute' }} />
            
            {/* Revealing Logo (Wipes from bottom to top, staying in place) */}
            <Animated.View style={{ 
              position: 'absolute', 
              bottom: 0, 
              width: '100%', 
              height: revealAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }), 
              overflow: 'hidden',
            }}>
               <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, alignItems: 'center', justifyContent: 'center' }}>
                 <MaterialIcons name="health-and-safety" size={140} color="#2563eb" />
               </View>
            </Animated.View>

            {/* Magnifying Glass */}
            <Animated.View 
              renderToHardwareTextureAndroid={true}
              style={{
                position: 'absolute',
                transform: [
                  { translateX: magXAnim },
                  { translateY: magYAnim }
                ]
              }}>
              <View style={{ padding: 10 }}>
                <MaterialIcons name="search" size={56} color="#3b82f6" style={{ textShadowColor: 'rgba(59,130,246,0.6)', textShadowOffset: {width: 0, height: 6}, textShadowRadius: 10 }} />
              </View>
            </Animated.View>
          </View>
          
          <Text style={{ fontSize: 16, color: '#64748b', marginTop: 60, fontWeight: '600', textAlign: 'center', lineHeight: 24 }}>
            수집된 증상 데이터를 바탕으로{"\n"}가장 정확한 원인을 찾고 있어요
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const dStyles = StyleSheet.create({
  bodyCard: {
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 32,
    padding: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    shadowColor: '#2563eb',
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 4,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    shadowColor: '#2563eb',
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 4,
    gap: 16,
  },
  stickyBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 50,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226,232,240,0.5)',
  },
});
