import supabase from '../Supabase/supabase.js';

// Supabaseで登録したテーブル名
const TABLE_NAME = "study-record";

/**
 * Supabaseからすべてのデータを取得
 * @returns {{}}
 */
export const getList = async () => {
  try {
      const { data, error } = await supabase
		.from(TABLE_NAME)
		.select('*')
		.order('created_at')

      if (error) {
        console.error("Supabase error:", error);
        return [];
      }

      return data

    } catch (e) {
      console.error("JS error:", e);
      return [];     // ← 重要！
    }

  return data; // 必ず配列
};
