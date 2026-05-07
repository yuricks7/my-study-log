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