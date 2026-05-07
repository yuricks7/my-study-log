import supabase from "./supabase"

// Supabaseで登録したテーブル名
const TABLE_NAME = "study-record";

/**
 * レコードを追加する
 *
 * @param {string} title
 * @param {number} time
 * @return {[]} 更新したレコードを格納した「配列」
 */
export const addRecord = async (title, time) => {
  const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        title: title,
        time: time
      })
      .select();

  if (error) {
    console.error('Insert error:', error)
    return null
  }

  return data; // 必ず配列
}

/**
 * レコードを更新する
 *
 * @param {string} uuid
 * @param {string} title
 * @param {number} time
 * @return {[]} 更新したレコードを格納した「配列」
 */
export const updateRecord = async (uuid, title, time) => {
  const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        title: title,
        time: time
      })
      .eq('id', uuid)
      .select();

  if (error) {
    console.error('Update error:', error)
    return null
  }

  return data; // 必ず配列
}

/**
 * レコードを削除する
 *
 * @param {string} uuid
 */
export const deleteRecord = async (uuid, title, time) => {
  const { data, error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', uuid);

  if (error) {
    console.error('Update error:', error)
    return null
  }

  return [];
}
