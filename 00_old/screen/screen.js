import { useEffect, useState } from 'react';

import { getList } from '../../components/Supabase/fetch';
import { addRecord, deleteRecord, updateRecord } from '../../components/Supabase/update';

export const useUpdate = () => {
  // -----------------------------
  // State
  // -----------------------------
  const [list, setList] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputTime,  setInputTime]  = useState(0);
  const [sumTime,    setSumTime]    = useState(0);
  const states = {
    list: list,
    title: inputTitle,
    time: inputTime,
    sum: sumTime
  };

  // -----------------------------
  // 初回ロード
  // -----------------------------
  const loadList = async () => {
    const data = await getList();
    setList(data);
  };

  useEffect(() => {
    loadList();
  }, []);

  // -----------------------------
  // 合計時間の自動更新
  // -----------------------------
  useEffect(() => {
    const total = list.reduce((sum, record) => sum + record.time, 0);
    setSumTime(total);
  }, [list]);

  // -----------------------------
  // 入力ハンドラ
  // -----------------------------
  const onChangeTitle = (e) => setInputTitle(e.target.value);
  const onChangeTime  = (e) => setInputTime(e.target.value);

  // -----------------------------
  // バリデーション
  // -----------------------------
  const canAddRecord = (text, num) => text !== '' && num > 0;

  const confirmAction = (text, num, action) => {
    return window.confirm(
      `この内容で${action}しますか？\n内容：${text}\n時間：${num}時間`
    );
  };

  // -----------------------------
  // 追加
  // -----------------------------
  const onClickAdd = async (e) => {
    e.preventDefault();

    const intTime = Number(inputTime);

    if (!canAddRecord(inputTitle, intTime)) {
      alert("入力が不正です");
      return;
    }
    if (!confirmAction(inputTitle, intTime, "追加")) return;

    const added = await addRecord(inputTitle, intTime);
    const newRow = added[0];

    // 画面を更新
    setList(prev => [...prev, newRow]); // ★ 追加は map ではなく push（append）

    setInputTitle('');
    setInputTime(0);
  };

  // -----------------------------
  // 更新
  // -----------------------------
  const onClickUpdate = async (index) => {
    const log = list[index];
    const intTime = Number(inputTime);

    if (!canAddRecord(inputTitle, intTime)) {
      alert("入力が不正です");
      return;
    }
    if (!confirmAction(inputTitle, intTime, "更新")) return;

    const updated = await updateRecord(log.id, inputTitle, intTime);
    const updatedRow = updated[0];

    // 画面を更新
    setList((prev) =>
      prev.map((item) =>
        item.id === updatedRow.id ? updatedRow : item
      )
    );

    setInputTitle('');
    setInputTime(0);
  };

  /**
   * 削除確認
   *
   * @param {object} record
   *
   * @return {boolean}
   */
  const confirmDelete = (record) => {
    let m = '';
    m += 'このレコードを削除しますか？\n';
    m += `内容: ${record.title}\n`;
    m += `時間: ${record.time}\n`;

    return window.confirm(m);
  }

  // -----------------------------
  // 削除
  // -----------------------------
  const onClickDelete = async (index) => {
    const log = list[index];

    if (!confirmDelete(log)) return;

    await deleteRecord(log.id);

    // 画面を更新
    setList(prev => prev.filter(item => item.id !== log.id));
  };

  return [states, {onChangeTitle, onChangeTime, onClickAdd, onClickUpdate, onClickDelete}];
}