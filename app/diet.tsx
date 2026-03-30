import { MaterialIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import TopBar from '../components/TopBar';

export default function DietLog() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50 overflow-hidden">
      <TopBar title="식단 상세 기록" showBack={true} showNotification={false} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-40 -right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 mx-auto w-full max-w-md"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Weekly Calendar Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-lg text-slate-900">2024년 5월</Text>
            <MaterialIcons name="calendar-month" size={20} color="#64748b" />
          </View>
          <View className="flex-row justify-between">
            {/* Mon */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">월</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">12</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-slate-700">82</Text>
              </View>
            </TouchableOpacity>
            {/* Tue */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">화</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">13</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-slate-700">75</Text>
              </View>
            </TouchableOpacity>
            {/* Wed (Active) */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.9}>
              <Text className="text-[11px] font-bold text-blue-600">수</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-blue-600 shadow-sm border border-blue-400">
                <Text className="text-white font-bold text-sm">14</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center border border-blue-200">
                <Text className="text-[10px] font-extrabold text-blue-600">92</Text>
              </View>
            </TouchableOpacity>
            {/* Thu */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">목</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">15</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-slate-700">88</Text>
              </View>
            </TouchableOpacity>
            {/* Fri */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">금</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">16</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-100 items-center justify-center">
                <Text className="text-[10px] font-bold text-slate-400">--</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting Section */}
        <View className="mb-8">
          <Text className="text-slate-900 font-extrabold text-2xl leading-snug tracking-tight">
            안녕하세요, 선우님!{'\n'}
            <Text className="text-slate-500 text-lg font-medium tracking-normal">오늘의 영양 상태를 한눈에 확인해보세요.</Text>
          </Text>
        </View>

        {/* Main Insight Card */}
        <View className="bg-white rounded-[32px] p-6 shadow-md border border-slate-50 mb-8" style={{ shadowColor: '#10b981', shadowOpacity: 0.1, shadowRadius: 25 }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-col gap-2">
              <Text className="text-slate-500 font-semibold text-sm">오늘의 식단 점수</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-4xl font-extrabold text-blue-600 tracking-tight">92</Text>
                <Text className="text-xl font-bold text-slate-900">점</Text>
              </View>
              <View className="flex-row items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <Text className="text-emerald-700 text-xs font-bold">매우 우수함</Text>
              </View>
            </View>

            <View className="relative w-28 h-28 items-center justify-center">
              <Svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                <Circle cx="56" cy="56" fill="transparent" r="48" stroke="#f1f5f9" strokeWidth="12" />
                <Circle cx="56" cy="56" fill="transparent" r="42" stroke="rgba(37,99,235,0.2)" strokeDasharray="263.89" strokeDashoffset="129.3" strokeLinecap="round" strokeWidth="6" />
                <Circle cx="56" cy="56" fill="transparent" r="48" stroke="#2563eb" strokeDasharray="301.59" strokeDashoffset="24.12" strokeLinecap="round" strokeWidth="12" />
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-blue-600 font-bold text-xl">92%</Text>
              </View>
            </View>
          </View>

          <View className="mt-6 pt-6 border-t border-slate-100 flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">칼로리</Text>
              <Text className="text-slate-900 font-bold text-sm">1,070 / 2,100</Text>
            </View>
            <View className="items-center flex-1 border-l border-slate-100 pl-6">
              <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">남은 칼로리</Text>
              <Text className="text-blue-600 font-bold text-sm">1,030 kcal</Text>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View className="flex-col gap-6 mb-8">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-xl text-slate-900 tracking-tight">오늘의 타임라인</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-blue-600 text-sm font-semibold">전체보기</Text>
            </TouchableOpacity>
          </View>

          {/* Breakfast */}
          <View className="relative pl-10 pt-1">
            <View className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-200" />
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500 items-center justify-center border-4 border-slate-50">
              <MaterialIcons name="wb-sunny" size={12} color="white" />
            </View>

            <View className="bg-white rounded-[32px] overflow-hidden shadow-md border border-slate-50 flex-col md:flex-row" style={{ shadowColor: '#2563eb', shadowOpacity: 0.1, shadowRadius: 20 }}>
              <View className="w-full md:w-32 h-32">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrJ74jNztfKIjQEMjB_vk-saDD4PFK3AVKRxSrO4z-b8j8TBy687MJunpmnxYB0VNpnVFCYlCkHoEDoDva3OCKWLxpD6WCdlFJZysBTRXR1dDQXKS6zlDZkP4K-q5X8aP3y_VAjOg1O2RB4mnnj5ekytbhIVDVphqjKhXzTskVdCb_Dwk-rtFRymxDLWWwaMWLDq-GqrOF_PZg8XwpRU98hF5xqI34pOlUlzH8WdIpqIPmz27HYv0TEQUrpfQGSTFIl3BacoRX2D3" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="p-5 flex-1 flex-col gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xs text-slate-500 font-medium">08:30 AM · 아침</Text>
                    <Text className="text-slate-900 font-bold text-lg mt-0.5 tracking-tight">닭가슴살 아보카도 샐러드</Text>
                  </View>
                  <Text className="text-blue-600 font-bold text-lg">420 kcal</Text>
                </View>

                <View className="flex-row gap-3">
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-slate-500">탄수화물</Text>
                      <Text className="text-[10px] font-bold text-slate-900">25g</Text>
                    </View>
                    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-amber-400" style={{ width: '40%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-slate-500">단백질</Text>
                      <Text className="text-[10px] font-bold text-slate-900">38g</Text>
                    </View>
                    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-blue-600" style={{ width: '75%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-slate-500">지방</Text>
                      <Text className="text-[10px] font-bold text-slate-900">18g</Text>
                    </View>
                    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-pink-500" style={{ width: '50%' }} />
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2 mt-1">
                  <View className="bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-slate-700">저탄고지</Text>
                  </View>
                  <View className="bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-emerald-700">고단백</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Lunch */}
          <View className="relative pl-10 pt-2">
            <View className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-200" />
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500 items-center justify-center border-4 border-slate-50">
              <MaterialIcons name="wb-sunny" size={12} color="white" />
            </View>

            <View className="bg-white rounded-[32px] overflow-hidden shadow-md border border-slate-50 flex-col md:flex-row" style={{ shadowColor: '#2563eb', shadowOpacity: 0.1, shadowRadius: 20 }}>
              <View className="w-full md:w-32 h-32">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrpYtY0KGWGHto9AsdQjM83Ark0VD_1B4dk-gaB-gCBHQjyJzU1ycqfce-hh_5CPTo9QOhWcurigmhsrPHot_ny97-uP9PUJK1mgQTjfIQLJ8I25EtRAJPw6UgIP30PSjAU84KE0E7bawf3iJfqTavnHUn2JPGk7NzayKFqEhu3DxX6HPn86tJ2cKHvUcMaoj2QKfTA-j5z6S5bdcu9LN-sobJNdSlrqROF1LECIaaj5dJcDPf7ZuJJxxdkrrGmzkvGqeB2uln7_S2" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="p-5 flex-1 flex-col gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xs text-slate-500 font-medium">12:45 PM · 점심</Text>
                    <Text className="text-slate-900 font-bold text-lg mt-0.5 tracking-tight">불고기 덮밥</Text>
                  </View>
                  <Text className="text-blue-600 font-bold text-lg">650 kcal</Text>
                </View>

                <View className="flex-row gap-3">
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-slate-500">탄수화물</Text>
                      <Text className="text-[10px] font-bold text-slate-900">82g</Text>
                    </View>
                    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-amber-400" style={{ width: '80%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-slate-500">단백질</Text>
                      <Text className="text-[10px] font-bold text-slate-900">28g</Text>
                    </View>
                    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-blue-600" style={{ width: '55%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-slate-500">지방</Text>
                      <Text className="text-[10px] font-bold text-slate-900">22g</Text>
                    </View>
                    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-pink-500" style={{ width: '60%' }} />
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2 mt-1">
                  <View className="bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-slate-700">균형 잡힌</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Dinner Scheduled */}
          <View className="relative pl-10 pt-2">
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-200 items-center justify-center border-4 border-slate-50">
              <MaterialIcons name="bedtime" size={12} color="#94a3b8" />
            </View>

            <View className="bg-white rounded-[32px] p-6 flex-col items-center justify-center border-2 border-dashed border-slate-300 shadow-sm">
              <Text className="text-slate-500 font-semibold mb-3">저녁 식사 예정</Text>
              <TouchableOpacity className="bg-blue-600 px-5 py-2.5 rounded-full flex-row items-center gap-2 shadow-sm" activeOpacity={0.8}>
                <MaterialIcons name="photo-camera" size={18} color="white" />
                <Text className="font-bold text-sm text-white">식단 기록하기</Text>
              </TouchableOpacity>
              <Text className="text-[11px] text-slate-400 font-medium mt-3">오후 07:00 예정</Text>
            </View>
          </View>
        </View>

        {/* Stats Bento Section */}
        <View className="flex-row gap-4 pb-8">
          <View className="bg-blue-50 p-6 rounded-[32px] flex-col gap-3 flex-1 border border-blue-100 shadow-sm">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="water-drop" size={20} color="#2563eb" />
              <Text className="text-slate-600 text-xs font-bold mt-0.5">수분 섭취</Text>
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-slate-900">1.2</Text>
              <Text className="text-xs text-slate-500 font-bold">/ 2.0L</Text>
            </View>
            <View className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden flex-row mt-1">
              <View className="h-full bg-blue-600" style={{ width: '60%' }} />
            </View>
          </View>

          <View className="bg-white border border-slate-50 p-6 rounded-[32px] flex-col gap-3 flex-1 shadow-md">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="bar-chart" size={20} color="#64748b" />
              <Text className="text-slate-600 text-xs font-bold mt-0.5">나트륨/당류 현황</Text>
            </View>

            <View className="flex-col gap-3 mt-1">
              <View className="flex-col gap-1.5">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-bold text-slate-900">나트륨</Text>
                  <Text className="text-[10px] font-extrabold text-red-500 uppercase mt-0.5">Warning</Text>
                </View>
                <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-red-500" style={{ width: '85%' }} />
                </View>
              </View>
              <View className="flex-col gap-1.5">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-bold text-slate-900">당류</Text>
                  <Text className="text-[10px] font-extrabold text-emerald-600 uppercase mt-0.5">Safe</Text>
                </View>
                <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-emerald-500" style={{ width: '32%' }} />
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
