import { useReducer } from "react";
import { studyLogReducer, initialState } from "../state/studyLog";

import { formatDate } from "../function/format";

export const History = (props) => {
  const [state, dispatch] = useReducer(studyLogReducer, initialState);

  // const { sum, studyLogs, onClickUpdate, onClickDelete } = props;

  return (
    <div className='history-area'>
      <h2>履歴</h2>
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
          {state.list.map((log, index) => {
            const dateStr = formatDate(log.created_at, "/");
            return (
              <tr key={log.id}>
                <td>{dateStr}</td>
                <td>{log.title}</td>
                <td>{log.time}時間</td>
                <td className='btn-space'>
                  <button onClick={() => onClickUpdate(index)}>更新</button>
                </td>
                <td className='btn-space'>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};