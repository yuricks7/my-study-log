import { useEffect, useState } from 'react';
import "./App.css";
import { Form } from './components/Form';
import { History } from './components/History';
import supabase from './components/repository';

function App() {
  const [inputText, setInputText] = useState('');
  const [inputTime, setInputTime] = useState(0);
  const [sumTime, setSumTime] = useState(0);

  // const records = [
  //   { key: 1, text: "勉強の記録1", time: 1},
  //   { key: 2, text: "勉強の記録2", time: 3},
  //   { key: 3, text: "勉強の記録3", time: 5}
  // ];
  // const [studyLogs, setStudyLogs] = useState(records);
  const [studyLogs, setStudyLogs] = useState([]);

  /**
   * 学習履歴の入力を受け付ける
   *
   * @param {Event} event
   */
  const onChangeText = (event) => {
    setInputText(event.target.value);
  }

  /**
   * 学習時間の入力を受け付ける
   *
   * @param {Event} event
   */
  const onChangeTime = (event) => {
    setInputTime(event.target.value);
  }

  /**
   * 日付を`yyyy/mm/dd`に変換する
   *
   * @param {Date}   date - 日付
   * @param {string} delimiter - 区切り文字列
   * @returns {string}
   */
  const formatDate = (date, delimiter = "") => {
    const fullYear = date.getFullYear();
    const month    = date.getMonth() + 1;
    const monthStr = (`00${month}`).slice(-2);
    const day    = date.getDate();
    const dayStr = (`00${day}`).slice(-2);
    return `${fullYear}${delimiter}${monthStr}${delimiter}${dayStr}`;
  };

  /**
   * ログを追加する
   */
  const onClickAdd = (event) => {
    event.preventDefault();

    const intTime = Number(inputTime);
    const isBlank = inputText === '';
    const isZeroHour = intTime <= 0;
    if (isBlank && isZeroHour) {
      alert('何も入力されていません');
    }
    if (isBlank) return;
    if (isZeroHour) return;

    let m = '';
    m += 'この内容で追加しますか？\n';
    m += `内容：${inputText}\n`;
    m += `時間：${intTime}時間`;
    alert(m);

    // 現時点のログを代入（スプレッド構文）し、末尾に新しいログを追加
    const newLog = {
      key: Date.now(),
      date: formatDate(new Date(), "/"),
      text: inputText,
      time: intTime,
    }

    // 値を更新
    const newLogs = [...studyLogs, newLog];
    setStudyLogs(newLogs);
    setSumTime((sumTime) => sumTime + newLog.time);

    // 初期化
    setInputText('');
    setInputTime(0);

    console.log(newLogs);
  };

  /**
   * ログを削除する
   *
   * @param {number} index - 押下したボタンのインデックス
   */
  const onClickDelete = (index) => {
    // いったん変数に格納
    const newLogs = [...studyLogs];
    const deleteLog = newLogs[index];

    // 削除処理
    newLogs.splice(index, 1);
    setStudyLogs(newLogs);
    setSumTime((sumTime) => sumTime - deleteLog.time)
  };

  return (
    <>
    <div className="container">
      <h1>学習記録アプリ</h1>

      <Form text={inputText} time={inputTime} onChangeText={onChangeText} onChangeTime={onChangeTime} onClick={onClickAdd}></Form>

      <History sum={sumTime} studyLogs={studyLogs} onClick={onClickDelete}></History>

    </div>
    </>
  )
}

export default App
