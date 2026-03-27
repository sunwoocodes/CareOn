import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Circle } from 'react-native-svg';
import TopBar from '../components/TopBar';

export default function Diagnosis() {
  return (
    <View className="flex-1 bg-[#f8fafc]">
      <TopBar title="분석 결과 리포트" showBack={true} showNotification={false} />

      <ScrollView contentContainerClassName="pt-32 pb-40 px-5 mx-auto w-full max-w-xl" className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section: AI Diagnosis Result */}
        <View className="bg-white rounded-3xl p-8 space-y-8 shadow-sm border border-slate-100/50 mb-8 relative overflow-hidden">
          {/* Background Blur Effect Mock */}
          <View className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mt-24" />
          
          <View className="items-center mb-8 z-10">
            <View className="bg-slate-100 px-3 py-1 rounded-full mb-3">
              <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">AI Comprehensive Analysis</Text>
            </View>
            <Text className="text-3xl font-headline font-extrabold tracking-tight text-on-surface mb-3">역류성 식도염 의심</Text>
            <Text className="text-slate-500 text-sm font-medium px-4 text-center leading-snug">위산이 식도로 역류하여 염증을 유발하는 상태가 감지되었습니다.</Text>
          </View>
          
          {/* Score Gauge */}
          <View className="items-center justify-center relative">
            <View className="relative w-56 h-56 items-center justify-center z-10">
              <Svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <Circle cx="80" cy="80" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                <Circle 
                  cx="80" cy="80" r="70" 
                  fill="transparent" 
                  stroke="#f97316" 
                  strokeWidth="20" 
                  strokeDasharray="439.8" 
                  strokeDashoffset="65.9" 
                  strokeLinecap="round" 
                />
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <View className="flex-row items-baseline mb-1">
                  <Text className="text-6xl font-headline font-extrabold text-on-surface tracking-tighter">85</Text>
                  <Text className="text-2xl font-bold ml-1 text-slate-500">%</Text>
                </View>
                <Text className="text-[#f97316] font-bold text-sm tracking-wide">높은 가능성</Text>
              </View>
            </View>
            <View className="w-64 mt-6 flex-row justify-between items-center px-4">
              <View className="items-center flex-col gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <Text className="text-[10px] font-bold text-slate-400">낮음</Text>
              </View>
              <View className="items-center flex-col gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                <Text className="text-[10px] font-bold text-[#f97316]">높음</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Diet-Symptom Correlation */}
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/50 mb-8">
          <Text className="text-lg font-headline font-bold text-on-surface mb-6">식단 및 증상 상관관계</Text>
          <View className="bg-error/5 p-4 rounded-2xl border border-error/10 flex-row gap-3 mb-4">
            <MaterialIcons name="warning" size={20} color="#ba1a1a" />
            <Text className="text-[13px] font-semibold text-error leading-snug flex-1 flex-wrap">
              오후 8시에 섭취한 <Text className="underline font-bold">매운 라면</Text>이 증상 악화의 핵심 원인으로 추정됩니다.
            </Text>
          </View>
          
          <View className="relative h-44 mt-4 w-full">
            {/* Timeline Grid */}
            <View className="absolute inset-0 top-0 bottom-8 flex-row justify-between w-full px-2">
              <View className="w-px h-full bg-slate-100" />
              <View className="w-px h-full bg-slate-100" />
              <View className="w-px h-full bg-primary/20" />
              <View className="w-px h-full bg-primary/20" />
              <View className="w-px h-full bg-primary/20" />
            </View>
            
            {/* Spline Chart */}
            <View className="absolute inset-0 px-2 h-36">
              <Svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <Defs>
                  <SvgLinearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#cbd5e1" />
                    <Stop offset="50%" stopColor="#3b82f6" />
                    <Stop offset="100%" stopColor="#1d4ed8" />
                  </SvgLinearGradient>
                </Defs>
                <Path 
                  d="M 0,85 C 15,85 25,80 30,75 C 40,65 50,55 55,45 C 65,30 75,10 80,5 C 90,-2 95,12 100,18" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </Svg>
            </View>
            
            {/* Food Event Marker */}
            <View className="absolute left-1/2 ml-2 top-4 items-center z-10">
              <View className="bg-white rounded-full w-9 h-9 items-center justify-center border border-slate-100 mb-1 shadow-sm">
                <Text className="text-xl">🍜</Text>
              </View>
              <View className="w-px h-24 border-l border-dashed border-primary/30" />
            </View>
            
            {/* X-Axis Labels */}
            <View className="absolute bottom-0 w-full flex-row justify-between items-center px-1">
              <Text className="text-[10px] font-bold text-slate-400">18:00</Text>
              <Text className="text-[10px] font-bold text-slate-400">19:00</Text>
              <View className="bg-primary/5 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-primary">20:00</Text>
              </View>
              <View className="bg-primary/5 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-primary">21:00</Text>
              </View>
              <View className="bg-primary/5 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-primary">22:00</Text>
              </View>
            </View>
          </View>
          <Text className="text-[11px] text-center text-slate-400 font-medium mt-2">식사 1시간 경과 시점부터 통증 수치가 급격히 상승함</Text>
        </View>

        {/* Why Section */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-lg font-headline font-bold px-1 text-on-surface">분석 근거 (Why?)</Text>
          <View className="flex-col gap-3">
            <View className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="check-circle" size={18} color="#059669" />
                <Text className="text-[13px] font-bold text-slate-500">증상 일치 항목</Text>
              </View>
              <View className="flex-col gap-2">
                <View className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                  <Text className="text-sm font-semibold text-slate-700">가슴 쓰림 및 타는 듯한 통증</Text>
                  <MaterialIcons name="check" size={16} color="#059669" />
                </View>
                <View className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                  <Text className="text-sm font-semibold text-slate-700">목에 무언가 걸린 듯한 이물감</Text>
                  <MaterialIcons name="check" size={16} color="#059669" />
                </View>
              </View>
            </View>
            
            <View className="bg-slate-50/80 rounded-3xl border border-slate-100 overflow-hidden">
              <TouchableOpacity className="flex-row items-center justify-between p-6">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="cancel" size={18} color="#94a3b8" />
                  <Text className="text-[13px] font-bold text-slate-400">일치하지 않는 항목</Text>
                </View>
                <MaterialIcons name="expand-more" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Care Tips */}
        <View className="bg-blue-600 rounded-3xl p-6 shadow-sm mb-8 flex-col gap-5">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="lightbulb" size={20} color="white" />
            <Text className="text-lg font-headline font-bold text-white">오늘의 관리 솔루션</Text>
          </View>
          <View className="flex-row gap-3">
            <View className="bg-white/10 p-4 rounded-2xl flex-col gap-2 border border-white/20 flex-1">
              <Text className="text-2xl mb-1">🌙</Text>
              <Text className="text-sm font-bold text-white">야식 피하기</Text>
              <Text className="text-[11px] text-blue-100 leading-snug font-medium pr-2">취침 3시간 전 공복 유지가 가장 중요합니다.</Text>
            </View>
            <View className="bg-white/10 p-4 rounded-2xl flex-col gap-2 border border-white/20 flex-1">
              <Text className="text-2xl mb-1">👕</Text>
              <Text className="text-sm font-bold text-white">복압 낮추기</Text>
              <Text className="text-[11px] text-blue-100 leading-snug font-medium pr-2">허리를 조이는 옷은 역류를 유발합니다.</Text>
            </View>
          </View>
        </View>

        {/* Smart Medication Safety Check Section */}
        <View className="flex-col gap-4 mb-4">
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-lg font-headline font-bold text-on-surface">스마트 복약 안전 체크</Text>
            <View className="bg-primary/10 px-2 py-0.5 rounded-full">
              <Text className="text-[10px] text-primary font-bold">LIVE CHECK</Text>
            </View>
          </View>
          
          <View className="flex-col gap-4">
            {/* Recommended Ingredient */}
            <View className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-col gap-1">
                  <Text className="text-[11px] font-bold text-primary uppercase tracking-wider">추천 성분 및 의약품</Text>
                  <Text className="text-xl font-headline font-extrabold text-on-surface leading-tight mt-1">알긴산나트륨{'\n'}<Text className="text-slate-400 font-medium text-sm">(Sodium Alginate)</Text></Text>
                </View>
                <View className="w-16 h-16 bg-blue-50/50 rounded-2xl items-center justify-center border border-blue-100">
                  <Text className="text-3xl">💧</Text>
                </View>
              </View>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Text className="text-slate-600 text-[11px] font-bold">위산 역류 억제</Text>
                </View>
                <View className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Text className="text-slate-600 text-[11px] font-bold">위 점막 보호</Text>
                </View>
                <View className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 mt-0.5 md:mt-0">
                  <Text className="text-slate-600 text-[11px] font-bold">빠른 완화</Text>
                </View>
              </View>
            </View>

            {/* Interaction Warning */}
            <View className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm">
              <View className="p-5 border-b border-slate-50">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-[13px] font-bold text-slate-500">나의 복약 상호작용</Text>
                  <View className="bg-error px-3 py-1 rounded-full flex-row items-center gap-1">
                    <Text className="text-white text-[11px] font-black">복용 금지 🚫</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center gap-4 mb-2">
                  <View className="flex-1 flex-row items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 relative pr-6">
                    <View className="w-10 h-10 rounded-xl bg-white items-center justify-center shadow-sm">
                      <Text className="text-xl">💊</Text>
                    </View>
                    <View>
                      <Text className="text-[10px] text-slate-400 font-bold mb-1">현재 복용 중인 약</Text>
                      <Text className="text-sm font-bold text-slate-800">테네리아정 <Text className="text-slate-500 font-medium">(당뇨약)</Text></Text>
                    </View>
                    
                    <View className="absolute right-[-14px] w-12 h-8 flex-row items-center justify-between z-10">
                      <View className="w-7 h-7 rounded-full bg-error border-2 border-white items-center justify-center absolute left-0 z-20">
                        <MaterialIcons name="close" size={14} color="white" />
                      </View>
                      <View className="w-7 h-7 rounded-full bg-primary border-2 border-white items-center justify-center absolute right-0 z-10">
                        <MaterialIcons name="bolt" size={14} color="white" />
                      </View>
                    </View>
                  </View>
                  <View className="w-12 h-12 rounded-2xl bg-primary/5 items-center justify-center border border-primary/10 ml-2">
                    <Text className="text-2xl">💧</Text>
                  </View>
                </View>
              </View>
              
              <View className="bg-error/5 p-5">
                <View className="flex-row gap-3 mb-4">
                  <MaterialIcons name="report-problem" size={20} color="#ba1a1a" />
                  <View className="flex-1">
                    <Text className="text-[13px] font-bold text-error mb-1">성분 중복 및 부작용 위험</Text>
                    <Text className="text-xs text-error opacity-80 font-semibold leading-relaxed">
                      현재 복용 중인 테네리아정의 주성분인 테네리글립틴과 알긴산나트륨 병용 시 약물 흡수율이 떨어질 수 있습니다. 반드시 주치의와 상담 후 복용을 결정하세요.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-white border border-error/30 py-3 rounded-xl flex-row items-center justify-center gap-2" activeOpacity={0.7}>
                  <MaterialIcons name="chat-bubble-outline" size={16} color="#ba1a1a" />
                  <Text className="text-error font-bold text-sm">약사에게 대체약 문의하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Other Possibilities */}
        <View className="flex-col gap-4 pt-4 mb-4">
          <Text className="text-[12px] font-bold text-slate-400 px-1 uppercase tracking-widest">기타 가능성 질환</Text>
          <View className="flex-col gap-3">
            <TouchableOpacity className="flex-row items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm" activeOpacity={0.8}>
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center border border-slate-100">
                  <MaterialIcons name="medical-services" size={20} color="#004ac6" />
                </View>
                <View>
                  <Text className="font-bold text-on-surface mb-0.5">급성 위염</Text>
                  <Text className="text-[11px] text-slate-400">위 점막의 일시적 염증</Text>
                </View>
              </View>
              <Text className="text-lg font-headline font-extrabold text-slate-600">65%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm" activeOpacity={0.8}>
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-slate-50 items-center justify-center border border-slate-100">
                  <MaterialIcons name="health-and-safety" size={20} color="#004ac6" />
                </View>
                <View>
                  <Text className="font-bold text-on-surface mb-0.5">기능성 소화불량</Text>
                  <Text className="text-[11px] text-slate-400">상복부 거북함 및 팽만감</Text>
                </View>
              </View>
              <Text className="text-lg font-headline font-extrabold text-slate-600">42%</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-col gap-3 pt-4 mb-8">
          <TouchableOpacity className="bg-error py-4 px-6 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm" activeOpacity={0.8}>
            <MaterialIcons name="emergency" size={24} color="white" className="animate-pulse" />
            <Text className="text-white font-extrabold text-lg">응급 SOS / 119 연결</Text>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl flex-col items-center gap-1.5 shadow-sm" activeOpacity={0.8}>
              <MaterialIcons name="local-hospital" size={24} color="#004ac6" />
              <Text className="text-slate-800 font-bold text-[13px]">주변 병원</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl flex-col items-center gap-1.5 shadow-sm" activeOpacity={0.8}>
              <MaterialIcons name="local-pharmacy" size={24} color="#004ac6" />
              <Text className="text-slate-800 font-bold text-[13px]">주변 약국</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center pb-8 pt-4">
          <Text className="text-[10px] text-slate-400 font-medium mb-1">식품의약품안전처(KFDA) DUR 데이터를 기반으로 분석되었습니다</Text>
          <Text className="text-[10px] text-slate-400 text-center px-6 leading-relaxed">본 서비스는 AI 모델의 분석 결과이며 의학적 판단을 대체할 수 없습니다. 증상이 지속될 경우 반드시 전문 의료진과 상담하십시오.</Text>
        </View>

      </ScrollView>
    </View>
  );
}
