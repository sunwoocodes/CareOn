/**
 * CareOn Phase 1: Skeleton Pipeline Test Script
 * 작성자: Sun-woo & Antigravity
 *
 * 실행 방법: npm run pipeline-test
 *
 * 역할:
 *  1. 입력된 이미지를 로컬 폴더(food_images_local/)에 복사하여 보관
 *  2. 임시 영양 DB(JSON)를 참조하여 칼로리 계산
 *  3. food_logs 테이블에 로컬 이미지 경로 포함 데이터 삽입
 *
 * ※ Supabase Storage 업로드 없음 → 용량 절약
 */

// .env 파일 자동 로드 (EXPO_PUBLIC_ 접두사 그대로 사용)
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// ── 1. Supabase 클라이언트 초기화 (.env에서 자동 로드) ──────────────────────
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ .env 파일에서 EXPO_PUBLIC_SUPABASE_URL 또는 EXPO_PUBLIC_SUPABASE_ANON_KEY를 읽지 못했습니다.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── 2. 로컬 이미지 저장 폴더 경로 ────────────────────────────────────────────
// 프로젝트 루트 기준 food_images_local/ 폴더에 이미지를 보관합니다.
const LOCAL_IMAGE_DIR = path.resolve(__dirname, '../food_images_local');

// ── 3. 임시 영양 정보 DB (100g 기준, AI Hub 데이터셋 기반 샘플) ──────────────
const nutritionDB = {
  '김치찌개': { kcal: 80,  protein: 6,  fat: 3,   carbs: 7  },
  '밥':       { kcal: 140, protein: 3,  fat: 0.5, carbs: 32 },
  '제육볶음':  { kcal: 180, protein: 20, fat: 8,   carbs: 15 },
  '된장찌개':  { kcal: 60,  protein: 5,  fat: 2,   carbs: 6  },
  '불고기':    { kcal: 175, protein: 22, fat: 7,   carbs: 9  },
};

// ── 4. 메인 파이프라인 함수 ───────────────────────────────────────────────────
/**
 * @param {string} localFilePath - 원본 이미지 경로
 * @param {string} foodName      - 음식 이름 (nutritionDB 키와 일치해야 함)
 * @param {number} grams         - 섭취량(g)
 * @param {string} [userId]      - user_id (NOT NULL 컬럼 대응용 테스트 UUID)
 */
async function startPipeline(localFilePath, foodName, grams, userId) {
  console.log('\n🚀 CareOn Phase 1 Skeleton Pipeline 시작\n' + '─'.repeat(50));

  try {
    // ── Step 1: 이미지 로컬 폴더에 저장 ────────────────────────────────────
    console.log(`\n[1/3] 🗂️  이미지 로컬 저장 중: ${path.basename(localFilePath)}`);

    // 저장 폴더 없으면 자동 생성
    if (!fs.existsSync(LOCAL_IMAGE_DIR)) {
      fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });
      console.log(`    📁 폴더 생성: ${LOCAL_IMAGE_DIR}`);
    }

    // 타임스탬프 기반 파일명으로 복사 (중복 방지)
    const ext = path.extname(localFilePath) || '.jpg';
    const savedFileName = `${Date.now()}_${foodName}${ext}`;
    const savedFilePath = path.join(LOCAL_IMAGE_DIR, savedFileName);

    fs.copyFileSync(localFilePath, savedFilePath);
    console.log(`    ✅ 저장 완료`);
    console.log(`    📂 경로: ${savedFilePath}`);

    // ── Step 2: 영양소 계산 ─────────────────────────────────────────────────
    console.log(`\n[2/3] 🧮 영양 성분 계산 중... (${foodName} / ${grams}g)`);

    const base = nutritionDB[foodName];
    if (!base) {
      console.warn(`    ⚠️  '${foodName}'이(가) 영양 DB에 없습니다. 0으로 처리합니다.`);
    }
    const { kcal = 0, protein = 0, fat = 0, carbs = 0 } = base || {};
    const ratio = grams / 100;

    const payload = {
      food_name: foodName,
      amount_g:  grams,
      kcal:      Math.round(kcal    * ratio * 10) / 10,
      protein:   Math.round(protein * ratio * 10) / 10,
      fat:       Math.round(fat     * ratio * 10) / 10,
      carbs:     Math.round(carbs   * ratio * 10) / 10,
      // Storage URL 대신 로컬 절대 경로를 저장
      image_url: savedFilePath,
    };

    // user_id 컬럼이 NOT NULL인 경우 테스트 UUID 삽입
    if (userId) payload.user_id = userId;

    console.log('    📊 계산 결과:');
    console.log(`       칼로리: ${payload.kcal} kcal`);
    console.log(`       단백질: ${payload.protein}g  |  지방: ${payload.fat}g  |  탄수화물: ${payload.carbs}g`);

    // ── Step 3: DB 삽입 ──────────────────────────────────────────────────────
    console.log(`\n[3/3] 💾 food_logs 테이블에 저장 중...`);

    const { data, error: dbError } = await supabase
      .from('food_logs')
      .insert([payload])
      .select();

    if (dbError) throw new Error(`[DB] ${dbError.message}`);

    console.log('    ✅ 저장 성공!\n');
    console.log('─'.repeat(50));
    console.log('✨ 파이프라인 실행 완료! ✨');
    console.log('─'.repeat(50));
    console.table(data);

  } catch (error) {
    console.error(`\n❌ 파이프라인 중단: ${error.message}`);
    if (error.message.includes('user_id')) {
      console.error('\n💡 user_id 힌트:');
      console.error('   • food_logs 테이블의 user_id 컬럼이 NOT NULL입니다.');
      console.error('   • startPipeline() 4번째 인자로 테스트 UUID를 전달하거나,');
      console.error('   • SQL: ALTER TABLE food_logs ALTER COLUMN user_id DROP NOT NULL;');
    }
    if (error.message.includes('DB')) {
      console.error('\n💡 DB 힌트:');
      console.error('   • food_logs RLS INSERT 정책을 확인하세요.');
    }
    process.exit(1);
  }
}

// ── 5. 실행 구간 ──────────────────────────────────────────────────────────────
// 테스트할 이미지 경로, 음식명, 섭취량을 수정하세요.
// user_id: food_logs.user_id가 NOT NULL이면 아래 UUID를 유지하세요.
//          nullable로 변경했다면 4번째 인자 없이 호출해도 됩니다.
const TEST_IMAGE_PATH = path.resolve(__dirname, '../sample_food.jpg');
const TEST_FOOD_NAME  = '김치찌개';
const TEST_GRAMS      = 250;
const TEST_USER_ID    = '00000000-0000-0000-0000-000000000001'; // 테스트용 UUID

if (!fs.existsSync(TEST_IMAGE_PATH)) {
  console.error(`\n❌ 이미지 파일을 찾을 수 없습니다: ${TEST_IMAGE_PATH}`);
  console.error('   👉 프로젝트 루트 폴더에 "sample_food.jpg" 파일을 준비한 후 다시 실행하세요.\n');
  process.exit(1);
}

startPipeline(TEST_IMAGE_PATH, TEST_FOOD_NAME, TEST_GRAMS, TEST_USER_ID);
