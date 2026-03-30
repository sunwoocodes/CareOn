import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';

export default function DiagnosisLog() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50 overflow-hidden">
      <TopBar showBack={true} showNotification={false} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Personalized Greeting */}
        <View className="mb-10">
          <Text className="text-3xl font-extrabold tracking-tight mb-2 leading-snug text-slate-900">
            선우님,{'\n'}지금까지의 기록이에요
          </Text>
          <Text className="text-slate-500 text-sm">분석된 결과와 추천 복약 정보를 확인하세요.</Text>
        </View>

        {/* Main Timeline Section */}
        <View className="flex-col gap-6 mb-12">
          {/* Selected Card: Timeline Item 1 */}
          <View className="bg-white rounded-[32px] p-6 shadow-md border-2 border-blue-200 relative overflow-hidden"
            style={{ shadowColor: '#2563eb', shadowOpacity: 0.12, shadowRadius: 25 }}>
            <View className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -mr-16 -mt-16" />

            <View className="flex-row justify-between items-start mb-4 relative z-10">
              <View className="bg-slate-100 px-3 py-1 rounded-full">
                <Text className="text-slate-500 text-xs font-bold">5월 14일 오후 2:30</Text>
              </View>
              <View className="flex-row items-center gap-1.5 px-3 py-1 bg-blue-600 rounded-full">
                <MaterialIcons name="edit-note" size={14} color="white" />
                <Text className="text-white text-[11px] font-bold">리뷰 작성 대기</Text>
              </View>
            </View>

            <Text className="text-xl font-bold mb-4 text-slate-900 relative z-10 tracking-tight">역류성 식도염 의심</Text>

            <View className="flex-col gap-4 relative z-10">
              <View className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Text className="text-xs text-slate-500 mb-1">추천 약품</Text>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="local-pharmacy" size={18} color="#2563eb" />
                  <Text className="font-bold text-slate-900">제산제 A (겔포스-M)</Text>
                </View>
              </View>
            </View>

            <View className="mt-4 pt-4 border-t border-slate-100 relative z-10">
              <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-full w-auto self-start border border-blue-100" activeOpacity={0.8}>
                <MaterialIcons name="receipt-long" size={16} color="#1d4ed8" />
                <Text className="text-blue-700 text-xs font-bold">약국 영수증 인증하고 포인트 받기</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Review Section */}
          <View className="mb-6 flex-col">
            <View className="flex-row items-end justify-between mb-6">
              <View>
                <Text className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Feedback</Text>
                <Text className="text-2xl font-bold text-slate-900 tracking-tight">약국 및 복약 리뷰</Text>
                <Text className="text-sm text-slate-500 mt-1">5월 14일 진료에 대한 후기를 남겨주세요</Text>
              </View>
              <Text className="text-xs text-slate-400">인증 후 작성 가능</Text>
            </View>

            <View className="flex-col gap-6">
              {/* Pharmacy Rating Card */}
              <View className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                <View className="flex-col gap-4">
                  <View className="pt-2 mb-2">
                    <Text className="text-base font-extrabold text-slate-700">[약국 서비스 리뷰 ⭐]</Text>
                  </View>
                  <View className="flex-row gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TouchableOpacity key={i} className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm" activeOpacity={0.7}>
                        <MaterialIcons name="star" size={24} color={i === 5 ? "#cbd5e1" : "#f59e0b"} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Medication Feedback Card */}
              <View className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex-col gap-8">
                <View className="flex-col gap-4">
                  <View className="pt-2 mb-2">
                    <Text className="text-base font-extrabold text-slate-700">[복약 효능 피드백 😊]</Text>
                  </View>

                  {/* Symptom Improvement */}
                  <View className="flex-col gap-3">
                    <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">증상 개선 정도</Text>
                    <View className="flex-row gap-2 p-1 bg-slate-100 rounded-xl">
                      <TouchableOpacity className="flex-1 py-3 bg-blue-600 rounded-lg shadow-sm items-center justify-center" activeOpacity={0.8}>
                        <Text className="text-white text-xs font-bold">좋아짐</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 py-3 bg-transparent rounded-lg items-center justify-center" activeOpacity={0.7}>
                        <Text className="text-slate-500 text-xs font-bold">그대로임</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 py-3 bg-transparent rounded-lg items-center justify-center" activeOpacity={0.7}>
                        <Text className="text-slate-500 text-xs font-bold">나빠짐</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Effectiveness Icons */}
                  <View className="flex-col gap-3">
                    <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">나에게 잘 맞았나요?</Text>
                    <View className="flex-row gap-3">
                      <TouchableOpacity className="flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-blue-200 shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="sentiment-satisfied" size={28} color="#2563eb" />
                        <Text className="text-xs font-bold text-blue-600">좋아요</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="sentiment-neutral" size={28} color="#94a3b8" />
                        <Text className="text-xs font-bold text-slate-500">보통이에요</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="sentiment-dissatisfied" size={28} color="#94a3b8" />
                        <Text className="text-xs font-bold text-slate-500">별로예요</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Side Effects Section */}
                <View className="pt-6 border-t border-slate-100 flex-col gap-4">
                  <Text className="text-sm font-bold text-slate-700">부작용 여부</Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl items-center" activeOpacity={0.8}>
                      <Text className="text-slate-500 font-bold text-sm">없음</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 py-4 bg-red-50 border-2 border-red-400 rounded-2xl items-center" activeOpacity={0.8}>
                      <Text className="text-red-600 font-bold text-sm">있음</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Emergency Response UI */}
                  <View className="mt-4 p-5 bg-red-50 rounded-[24px] border border-red-100 flex-col">
                    <Text className="text-sm font-bold text-slate-700 mb-3">어떤 부작용인가요?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                      <TouchableOpacity className="px-4 py-2 bg-white border border-slate-200 rounded-full" activeOpacity={0.7}>
                        <Text className="text-xs font-semibold text-slate-500">발진</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-4 py-2 bg-red-500 rounded-full shadow-sm" activeOpacity={0.8}>
                        <Text className="text-xs font-semibold text-white">어지러움</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-4 py-2 bg-white border border-slate-200 rounded-full" activeOpacity={0.7}>
                        <Text className="text-xs font-semibold text-slate-500">구토</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="px-4 py-2 bg-white border border-slate-200 rounded-full" activeOpacity={0.7}>
                        <Text className="text-xs font-semibold text-slate-500">기타</Text>
                      </TouchableOpacity>
                    </View>

                    <View className="flex-row items-start gap-2 mb-2">
                      <MaterialIcons name="warning" size={16} color="#dc2626" />
                      <Text className="text-xs font-bold leading-relaxed text-red-600 flex-1">경고: 증상이 심할 경우 즉시 복용을 중단하고 전문의와 상담하세요.</Text>
                    </View>

                    <View className="mt-4 pt-4 border-t border-red-200">
                      <TouchableOpacity className="w-full py-3.5 bg-red-500 rounded-xl flex-row items-center justify-center gap-2 shadow-sm" activeOpacity={0.8}>
                        <MaterialIcons name="location-on" size={16} color="white" />
                        <Text className="text-white text-xs font-bold">내 주변 내과/응급실 찾기 →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="mt-8">
              <TouchableOpacity className="w-full py-4 bg-blue-600 rounded-2xl flex-row justify-center shadow-md" activeOpacity={0.8}>
                <Text className="text-white font-bold text-base">리뷰 제출하고 +100P 받기</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Completed Card: Timeline Item 2 */}
          <View className="bg-white rounded-[32px] p-6 border border-slate-100 flex-col gap-5 shadow-sm">
            <View className="flex-col">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-[11px] font-medium text-slate-500">5월 10일 오전 10:15</Text>
                <View className="flex-row items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                  <MaterialIcons name="check-circle" size={12} color="#64748b" />
                  <Text className="text-slate-500 text-[10px] font-bold">리뷰 작성 완료</Text>
                </View>
              </View>
              <Text className="text-lg font-bold text-slate-900 mb-3 tracking-tight">급성 편도염 초기</Text>

              <View className="flex-row gap-2 mb-4">
                <View className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                  <Text className="text-xs font-medium text-slate-700">침 삼킬 때 통증</Text>
                </View>
                <View className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                  <Text className="text-xs font-medium text-slate-700">미열</Text>
                </View>
              </View>

              <View className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <Text className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">Recommended Care</Text>
                <Text className="text-sm font-semibold text-slate-700 mt-1">인후염 소염제 B 및 충분한 수분 섭취</Text>
              </View>
            </View>

            <View className="pt-4 border-t border-slate-100">
              <View className="flex-row items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full w-auto self-start border border-blue-100 opacity-70">
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
