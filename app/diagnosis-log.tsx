import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';

export default function DiagnosisLog() {
  return (
    <View className="flex-1 bg-surface">
      <TopBar title="증상 상세 분석" showBack={true} showNotification={false} />

      <ScrollView contentContainerClassName="pt-32 pb-40 px-6 mx-auto w-full max-w-xl" className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Personalized Greeting */}
        <View className="mb-10">
          <Text className="font-headline text-3xl font-extrabold tracking-tight mb-2 leading-snug text-on-surface">
            선우님,{'\n'}지금까지의 기록이에요
          </Text>
          <Text className="text-secondary text-sm opacity-70">분석된 결과와 추천 복약 정보를 확인하세요.</Text>
        </View>

        {/* Main Timeline Section */}
        <View className="flex-col gap-6 mb-12">
          {/* Selected Card: Timeline Item 1 */}
          <View className="bg-white rounded-[24px] p-6 shadow-sm border-2 border-primary relative overflow-hidden">
            <View className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            
            <View className="flex-row justify-between items-start mb-4 relative z-10">
              <View className="bg-surface-container-high px-3 py-1 rounded-full">
                <Text className="text-slate-500 text-xs font-bold">5월 14일 오후 2:30</Text>
              </View>
              <View className="flex-row items-center gap-1.5 px-3 py-1 bg-primary text-white rounded-full">
                <MaterialIcons name="edit-note" size={14} color="white" className="animate-pulse" />
                <Text className="text-white text-[11px] font-bold">리뷰 작성 대기</Text>
              </View>
            </View>
            
            <Text className="font-headline text-xl font-bold mb-4 text-on-surface relative z-10">역류성 식도염 의심</Text>
            
            <View className="flex-col gap-4 relative z-10">
              <View className="p-4 bg-surface-container-low rounded-xl">
                <Text className="text-xs text-secondary mb-1">추천 약품</Text>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="local-pharmacy" size={18} color="#004ac6" />
                  <Text className="font-bold text-on-surface">제산제 A (겔포스-M)</Text>
                </View>
              </View>
            </View>
            
            <View className="mt-4 pt-4 border-t border-slate-100 relative z-10">
              <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-full w-auto self-start" activeOpacity={0.8}>
                <MaterialIcons name="receipt-long" size={16} color="#1d4ed8" />
                <Text className="text-blue-800 text-xs font-bold">약국 영수증 인증하고 포인트 받기</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Review Section */}
          <View className="mb-6 flex-col">
            <View className="flex-row items-end justify-between mb-6">
              <View>
                <Text className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Feedback</Text>
                <Text className="font-headline text-2xl font-bold text-on-surface">약국 및 복약 리뷰</Text>
                <Text className="text-sm text-secondary mt-1">5월 14일 진료에 대한 후기를 남겨주세요</Text>
              </View>
              <Text className="text-xs text-secondary opacity-50">인증 후 작성 가능</Text>
            </View>
            
            <View className="flex-col gap-6">
              {/* Pharmacy Rating Card */}
              <View className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <View className="flex-col gap-4">
                  <View className="pt-2 mb-2">
                    <Text className="text-base font-extrabold text-slate-700">[약국 서비스 리뷰 ⭐]</Text>
                  </View>
                  <View className="flex-row gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TouchableOpacity key={i} className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm" activeOpacity={0.7}>
                        <MaterialIcons name="star" size={24} color={i === 5 ? "#cbd5e1" : "#fbbf24"} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Medication Feedback Card */}
              <View className="bg-slate-50 rounded-[24px] p-6 border border-slate-100 flex-col gap-8">
                <View className="flex-col gap-4">
                  <View className="pt-2 mb-2">
                    <Text className="text-base font-extrabold text-slate-700">[복약 효능 피드백 😊]</Text>
                  </View>
                  
                  {/* Symptom Improvement */}
                  <View className="flex-col gap-3">
                    <Text className="text-[11px] font-bold text-secondary uppercase tracking-tight">증상 개선 정도</Text>
                    <View className="flex-row gap-2 p-1 bg-surface-container rounded-xl">
                      <TouchableOpacity className="flex-1 py-3 bg-primary rounded-lg shadow-sm items-center justify-center" activeOpacity={0.8}>
                        <Text className="text-white text-xs font-bold">좋아짐</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 py-3 bg-transparent rounded-lg items-center justify-center" activeOpacity={0.7}>
                        <Text className="text-secondary text-xs font-bold">그대로임</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 py-3 bg-transparent rounded-lg items-center justify-center" activeOpacity={0.7}>
                        <Text className="text-secondary text-xs font-bold">나빠짐</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Effectiveness Icons */}
                  <View className="flex-col gap-3">
                    <Text className="text-[11px] font-bold text-secondary uppercase tracking-tight">나에게 잘 맞았나요?</Text>
                    <View className="flex-row gap-3">
                      <TouchableOpacity className="flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-primary/20 shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="sentiment-satisfied" size={28} color="#004ac6" />
                        <Text className="text-xs font-bold text-primary">좋아요</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="sentiment-neutral" size={28} color="#94a3b8" />
                        <Text className="text-xs font-bold text-secondary">보통이에요</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-transparent shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="sentiment-dissatisfied" size={28} color="#94a3b8" />
                        <Text className="text-xs font-bold text-secondary">별로예요</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Side Effects Section */}
                <View className="pt-6 border-t border-slate-200/50 flex-col gap-4">
                  <Text className="text-sm font-bold text-slate-700">부작용 여부</Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 py-4 bg-white border border-slate-100 rounded-2xl items-center" activeOpacity={0.8}>
                      <Text className="text-slate-500 font-bold text-sm">없음</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 py-4 bg-error/5 border-2 border-error rounded-2xl items-center" activeOpacity={0.8}>
                      <Text className="text-error font-bold text-sm">있음</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Emergency Response UI */}
                  <View className="mt-4 p-5 bg-error/5 rounded-[24px] border border-error/20 flex-col">
                    <Text className="text-sm font-bold text-slate-700 mb-3">어떤 부작용인가요?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                      <TouchableOpacity className="px-4 py-2 bg-white border border-slate-200 rounded-full" activeOpacity={0.7}>
                        <Text className="text-xs font-semibold text-secondary">발진</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-4 py-2 bg-error border border-error rounded-full shadow-sm" activeOpacity={0.8}>
                        <Text className="text-xs font-semibold text-white">어지러움</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-4 py-2 bg-white border border-slate-200 rounded-full" activeOpacity={0.7}>
                        <Text className="text-xs font-semibold text-secondary">구토</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-4 py-2 bg-white border border-slate-200 rounded-full" activeOpacity={0.7}>
                        <Text className="text-xs font-semibold text-secondary">기타</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View className="flex-row items-start gap-2 text-error mb-2">
                      <MaterialIcons name="warning" size={16} color="#ba1a1a" className="mt-0.5" />
                      <Text className="text-xs font-bold leading-relaxed text-error flex-1">경고: 증상이 심할 경우 즉시 복용을 중단하고 전문의와 상담하세요.</Text>
                    </View>
                    
                    <View className="mt-4 pt-4 border-t border-error/20">
                      <TouchableOpacity className="w-full py-3.5 bg-error rounded-xl flex-row items-center justify-center gap-2 shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="location-on" size={16} color="white" />
                        <Text className="text-white text-xs font-bold">내 주변 내과/응급실 찾기 →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="mt-8">
              <TouchableOpacity className="w-full py-4 bg-primary rounded-2xl flex-row justify-center shadow-sm" activeOpacity={0.8}>
                <Text className="text-white font-bold text-base">리뷰 제출하고 +100P 받기</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Completed Card: Timeline Item 2 */}
          <View className="bg-white rounded-[24px] p-6 border border-slate-100 flex-col gap-5 shadow-sm">
            <View className="flex-col">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-[11px] font-medium text-secondary opacity-80">5월 10일 오전 10:15</Text>
                <View className="flex-row items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full">
                  <MaterialIcons name="check-circle" size={12} color="#64748b" />
                  <Text className="text-secondary text-[10px] font-bold">리뷰 작성 완료</Text>
                </View>
              </View>
              <Text className="font-headline text-lg font-bold text-on-surface mb-3">급성 편도염 초기</Text>
              
              <View className="flex-row gap-2 mb-4">
                <View className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <Text className="text-xs font-medium text-slate-600">침 삼킬 때 통증</Text>
                </View>
                <View className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <Text className="text-xs font-medium text-slate-600">미열</Text>
                </View>
              </View>
              
              <View className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <Text className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">Recommended Care</Text>
                <Text className="text-sm font-semibold text-slate-700 mt-1">인후염 소염제 B 및 충분한 수분 섭취</Text>
              </View>
            </View>
            
            <View className="pt-4 border-t border-slate-100">
              <View className="flex-row items-center gap-2 px-5 py-2.5 bg-blue-50/50 rounded-full w-auto self-start border border-blue-100/50 opacity-70">
                <MaterialIcons name="verified" size={14} color="#64748b" />
                <Text className="text-slate-500 text-xs font-bold">영수증 인증 완료</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Medical Disclaimer */}
        <View className="mt-8 mb-8 items-center">
          <Text className="text-[11px] text-slate-400 text-center px-8 leading-relaxed">
            본 분석 결과는 참고용이며 전문의의 진단을 대신할 수 없습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
