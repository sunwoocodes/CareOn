import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import TopBar from '../components/TopBar';

export default function DietLog() {
  return (
    <View className="flex-1 bg-surface">
      <TopBar title="식단 상세 기록" showBack={true} showNotification={false} />

      <ScrollView contentContainerClassName="pt-32 pb-12 px-6 mx-auto w-full max-w-2xl" className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Weekly Calendar Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-headline font-bold text-lg text-on-surface">2024년 5월</Text>
            <MaterialIcons name="calendar-month" size={20} color="#505f76" />
          </View>
          <View className="flex-row justify-between">
            {/* Mon */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-secondary">월</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-surface-container-low">
                <Text className="text-on-surface font-headline font-bold text-sm">12</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-secondary-container/50 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-on-secondary-container">82</Text>
              </View>
            </TouchableOpacity>
            {/* Tue */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-secondary">화</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-surface-container-low">
                <Text className="text-on-surface font-headline font-bold text-sm">13</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-secondary-container/50 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-on-secondary-container">75</Text>
              </View>
            </TouchableOpacity>
            {/* Wed (Active) */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.9}>
              <Text className="text-[11px] font-bold text-primary">수</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-primary shadow-sm border border-blue-400">
                <Text className="text-white font-headline font-bold text-sm">14</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-primary/20 items-center justify-center border border-primary/20">
                <Text className="text-[10px] font-extrabold text-primary">92</Text>
              </View>
            </TouchableOpacity>
            {/* Thu */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-secondary">목</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-surface-container-low">
                <Text className="text-on-surface font-headline font-bold text-sm">15</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-secondary-container/50 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-on-secondary-container">88</Text>
              </View>
            </TouchableOpacity>
            {/* Fri */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-secondary">금</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-surface-container-low">
                <Text className="text-on-surface font-headline font-bold text-sm">16</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-surface-container items-center justify-center">
                <Text className="text-[10px] font-bold text-secondary opacity-50">--</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting Section */}
        <View className="mb-8">
          <Text className="text-on-surface font-headline font-extrabold text-2xl leading-snug">
            안녕하세요, 선우님!{'\n'}
            <Text className="text-secondary opacity-80 text-lg font-medium">오늘의 영양 상태를 한눈에 확인해보세요.</Text>
          </Text>
        </View>

        {/* Main Insight Card */}
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-col gap-2">
              <Text className="text-secondary font-semibold text-sm">오늘의 식단 점수</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-4xl font-headline font-extrabold text-primary">92</Text>
                <Text className="text-xl font-bold text-on-surface">점</Text>
              </View>
              <View className="flex-row items-center gap-1.5 bg-tertiary-container/20 px-3 py-1.5 rounded-full border border-tertiary-container/30">
                <View className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <Text className="text-on-tertiary-fixed-variant text-xs font-bold">매우 우수함</Text>
              </View>
            </View>
            
            <View className="relative w-28 h-28 items-center justify-center">
              <Svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                <Circle cx="56" cy="56" fill="transparent" r="48" stroke="#eceef0" strokeWidth="12" />
                <Circle cx="56" cy="56" fill="transparent" r="42" stroke="rgba(0,74,198,0.2)" strokeDasharray="263.89" strokeDashoffset="129.3" strokeLinecap="round" strokeWidth="6" />
                <Circle cx="56" cy="56" fill="transparent" r="48" stroke="#004ac6" strokeDasharray="301.59" strokeDashoffset="24.12" strokeLinecap="round" strokeWidth="12" />
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-primary font-headline font-bold text-xl">92%</Text>
              </View>
            </View>
          </View>
          
          <View className="mt-6 pt-6 border-t border-slate-100 flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">칼로리</Text>
              <Text className="text-on-surface font-bold text-sm">1,070 / 2,100</Text>
            </View>
            <View className="items-center flex-1 border-l border-slate-100 pl-6">
              <Text className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">남은 칼로리</Text>
              <Text className="text-primary font-bold text-sm">1,030 kcal</Text>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View className="flex-col gap-6 mb-8">
          <View className="flex-row items-center justify-between">
            <Text className="font-headline font-bold text-xl text-on-surface">오늘의 타임라인</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-primary text-sm font-semibold">전체보기</Text>
            </TouchableOpacity>
          </View>

          {/* Breakfast */}
          <View className="relative pl-10 pt-1">
            <View className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-surface-container" />
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-container items-center justify-center border-4 border-surface">
              <MaterialIcons name="wb-sunny" size={12} color="white" />
            </View>
            
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-50 flex-col md:flex-row">
              <View className="w-full md:w-32 h-32">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrJ74jNztfKIjQEMjB_vk-saDD4PFK3AVKRxSrO4z-b8j8TBy687MJunpmnxYB0VNpnVFCYlCkHoEDoDva3OCKWLxpD6WCdlFJZysBTRXR1dDQXKS6zlDZkP4K-q5X8aP3y_VAjOg1O2RB4mnnj5ekytbhIVDVphqjKhXzTskVdCb_Dwk-rtFRymxDLWWwaMWLDq-GqrOF_PZg8XwpRU98hF5xqI34pOlUlzH8WdIpqIPmz27HYv0TEQUrpfQGSTFIl3BacoRX2D3" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="p-4 flex-1 flex-col gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xs text-secondary font-medium">08:30 AM · 아침</Text>
                    <Text className="text-on-surface font-bold text-lg mt-0.5">닭가슴살 아보카도 샐러드</Text>
                  </View>
                  <Text className="text-primary font-headline font-bold text-lg">420 kcal</Text>
                </View>
                
                <View className="flex-row gap-3">
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-secondary">탄수화물</Text>
                      <Text className="text-[10px] font-bold text-on-surface">25g</Text>
                    </View>
                    <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-amber-400" style={{ width: '40%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-secondary">단백질</Text>
                      <Text className="text-[10px] font-bold text-on-surface">38g</Text>
                    </View>
                    <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-blue-600" style={{ width: '75%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-secondary">지방</Text>
                      <Text className="text-[10px] font-bold text-on-surface">18g</Text>
                    </View>
                    <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-pink-500" style={{ width: '50%' }} />
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2 mt-1">
                  <View className="bg-surface-container px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-on-secondary-container">저탄고지</Text>
                  </View>
                  <View className="bg-tertiary-container/20 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-tertiary">고단백</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Lunch */}
          <View className="relative pl-10 pt-2">
            <View className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-surface-container" />
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-container items-center justify-center border-4 border-surface">
              <MaterialIcons name="wb-sunny" size={12} color="white" />
            </View>
            
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-50 flex-col md:flex-row">
              <View className="w-full md:w-32 h-32">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrpYtY0KGWGHto9AsdQjM83Ark0VD_1B4dk-gaB-gCBHQjyJzU1ycqfce-hh_5CPTo9QOhWcurigmhsrPHot_ny97-uP9PUJK1mgQTjfIQLJ8I25EtRAJPw6UgIP30PSjAU84KE0E7bawf3iJfqTavnHUn2JPGk7NzayKFqEhu3DxX6HPn86tJ2cKHvUcMaoj2QKfTA-j5z6S5bdcu9LN-sobJNdSlrqROF1LECIaaj5dJcDPf7ZuJJxxdkrrGmzkvGqeB2uln7_S2" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="p-4 flex-1 flex-col gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xs text-secondary font-medium">12:45 PM · 점심</Text>
                    <Text className="text-on-surface font-bold text-lg mt-0.5">불고기 덮밥</Text>
                  </View>
                  <Text className="text-primary font-headline font-bold text-lg">650 kcal</Text>
                </View>
                
                <View className="flex-row gap-3">
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-secondary">탄수화물</Text>
                      <Text className="text-[10px] font-bold text-on-surface">82g</Text>
                    </View>
                    <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-amber-400" style={{ width: '80%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-secondary">단백질</Text>
                      <Text className="text-[10px] font-bold text-on-surface">28g</Text>
                    </View>
                    <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-blue-600" style={{ width: '55%' }} />
                    </View>
                  </View>
                  <View className="flex-1 flex-col gap-1.5">
                    <View className="flex-row justify-between">
                      <Text className="text-[10px] font-bold text-secondary">지방</Text>
                      <Text className="text-[10px] font-bold text-on-surface">22g</Text>
                    </View>
                    <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                      <View className="h-full bg-pink-500" style={{ width: '60%' }} />
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2 mt-1">
                  <View className="bg-surface-container px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-on-secondary-container">균형 잡힌</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Dinner Scheduled */}
          <View className="relative pl-10 pt-2">
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surface-container items-center justify-center border-4 border-surface">
              <MaterialIcons name="bedtime" size={12} color="#94a3b8" />
            </View>
            
            <View className="bg-surface-container-low rounded-2xl p-6 flex-col items-center justify-center border-2 border-dashed border-slate-300">
              <Text className="text-secondary font-semibold mb-3">저녁 식사 예정</Text>
              <TouchableOpacity className="bg-primary px-5 py-2.5 rounded-full flex-row items-center gap-2 shadow-sm" activeOpacity={0.8}>
                <MaterialIcons name="photo-camera" size={18} color="white" />
                <Text className="font-bold text-sm text-white">식단 기록하기</Text>
              </TouchableOpacity>
              <Text className="text-[11px] text-slate-400 font-medium mt-3">오후 07:00 예정</Text>
            </View>
          </View>
        </View>

        {/* Stats Bento Section */}
        <View className="flex-row gap-4 pb-8">
          <View className="bg-blue-50/50 p-5 rounded-2xl flex-col gap-3 flex-1 border border-blue-100">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="water-drop" size={20} color="#004ac6" />
              <Text className="text-secondary text-xs font-bold mt-0.5">수분 섭취</Text>
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-xl font-headline font-bold text-on-surface">1.2</Text>
              <Text className="text-xs text-secondary font-bold">/ 2.0L</Text>
            </View>
            <View className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden flex-row">
              <View className="h-full bg-primary" style={{ width: '60%' }} />
            </View>
          </View>
          
          <View className="bg-white border border-slate-100 p-5 rounded-2xl flex-col gap-3 flex-1 shadow-sm">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="bar-chart" size={20} color="#505f76" />
              <Text className="text-secondary text-xs font-bold mt-0.5">나트륨/당류 현황</Text>
            </View>
             
             <View className="flex-col gap-2">
              <View className="flex-col gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-bold text-on-surface">나트륨</Text>
                  <Text className="text-[10px] font-extrabold text-error uppercase mt-0.5">Warning</Text>
                </View>
                <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-error" style={{ width: '85%' }} />
                </View>
              </View>
              <View className="flex-col gap-1 mt-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-bold text-on-surface">당류</Text>
                  <Text className="text-[10px] font-extrabold text-tertiary uppercase mt-0.5">Safe</Text>
                </View>
                <View className="h-1 bg-surface-container rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-tertiary" style={{ width: '32%' }} />
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
