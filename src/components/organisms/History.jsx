import { useState } from "react";
import { formatDate } from "../../state/studyLog/utils";

import { PrimaryButton } from "../atoms/buttons/PrimaryButton";
import { UpdatingSkeleton } from "../atoms/loadings/UpdatingSkeleton";

import { ErrorMessage } from "../atoms/ErrorMessage";
import { HistoryBody } from "../molecules/HistoryBody";
import { AreaHeader } from "../atoms/headers/AreaHeader";

export const History = (props) => {
  const { state, onDelete, onUpdate } = props;
  const [error, setError] = useState("");

  if (state.isUpdating) {
    return <UpdatingSkeleton />;
  }

  // ★ 更新ボタン押下時のバリデーション
  const handleClickUpdate = (item) => {
    const title = state.title;
    const time = state.time;

    if (!title.trim()) {
      setError("タイトルを入力してください");
      return;
    }

    if (time <= 0) {
      setError("時間は1以上を入力してください");
      return;
    }

    setError("");

    onUpdate({
      id: item.id,
      title,
      time
    });
  };

  return (
    <div className='history-area'>
      <AreaHeader>履歴</AreaHeader>

      {/* ★ エラー表示 */}
      {error && <ErrorMessage message={error} />}

      <p id="sum-time">{`合計：${state.sum}時間`}</p>

      <table>
        <thead>
          <tr>
            <th>学習日</th>
            <th>内容</th>
            <th>時間</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {state.list.map((item) => {
            const dateStr = formatDate(item.created_at, "/");
            return (
              // <HistoryBody
              //   log={item}
              //   onUpdate={() => handleClickUpdate(item)}
              //   onDelete={() => onDelete(item.id)}
              // />
              <tr key={item.id}>
                <td>{dateStr}</td>
                <td>{item.title}</td>
                <td>{item.time}時間</td>
                <td className='btn-space'>
                  <PrimaryButton onClick={() => handleClickUpdate(item)}>
                    更新
                  </PrimaryButton>
                </td>
                <td className='btn-space'>
                  <PrimaryButton onClick={() => onDelete(item.id)}>
                    削除
                  </PrimaryButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};