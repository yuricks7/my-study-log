import { formatDate } from "../../state/studyLog/utils";
import { PrimaryButton } from "../atoms/buttons/PrimaryButton";

export const HistoryBody = (props) => {
  const { log, onUpdate, onDelete } = props;

  return (
    <>
      <tr key={log.id}>
        <td>{formatDate(log.created_at, "/")}</td>
        <td>{log.title}</td>
        <td>{log.time}時間</td>
        <td className='btn-space'>
          <PrimaryButton onClick={onUpdate(log)}>
            更新
          </PrimaryButton>
        </td>
        <td className='btn-space'>
          <PrimaryButton onClick={onDelete(log.id)}>
            削除
          </PrimaryButton>
        </td>
      </tr>
    </>
  )
}