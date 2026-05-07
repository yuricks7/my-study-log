import {
  LOGS_REPLACED,
  LOG_ADDED,
  LOG_UPDATED,
  LOG_REMOVED
} from "./actions";

/**
 * Supabase内のテーブル名
 */
export const TABLE_NAME = "study-record";

/**
 * リストを操作する
 *
 * @param {[{}]} list - データを格納した配列
 * @param {{}} action - 操作の内容
  *
 * @returns {[{}]}最新のデータを格納した配列
 */
export function updateList(list, action) {
  switch (action.type) {
    case LOGS_REPLACED:
      return action.logs;

    case LOG_ADDED:
      return [...list, action.log];

    case LOG_UPDATED:
      return list.map((item) =>
        item.id === action.log.id ? action.log : item
      );

    case LOG_REMOVED:
      return list.filter((item) => item.id !== action.id);

    default:
      return list;
  }
}

/**
 * 合計時間を算出する
 *
 * @param {[{}]} list - データを格納した配列
 *
 * @returns {number} 合計時間
 */
export function calcSum(list) {
  return list.reduce((s, r) => s + r.time, 0);
}

/**
 * 日付を`yyyy/mm/dd`に変換する
 *
 * @param {Date}   date - 日付
 * @param {string} delimiter - 区切り文字列
 * @returns {string}
 */
export const formatDate = (date, delimiter = "") => {
  const formattingDate = new Date(date);

  const fullYear = formattingDate.getFullYear();
  const month    = formattingDate.getMonth() + 1;
  const monthStr = (`00${month}`).slice(-2);
  const day      = formattingDate.getDate();
  const dayStr   = (`00${day}`).slice(-2);
  return `${fullYear}${delimiter}${monthStr}${delimiter}${dayStr}`;
};