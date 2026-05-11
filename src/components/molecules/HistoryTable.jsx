import { formatDate } from "../../state/studyLog/utils";

export const HistoryTable = (props) => {
  const { state, handleClickUpdate, onDelete } = props;

  return (
    <>
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
    </>
  )
}