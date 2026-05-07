import { useEffect } from "react";

import { logsResource } from "../../App";
import { LOGS_REPLACED } from "../../state/studyLog";

import { History } from "../organisms/History";

export const HistoryLoader = (props) => {
  const { state, dispatch, onUpdate, onDelete } = props;

  // 初回ロード時に reducer に流し込む
  const logs = logsResource.read();
  useEffect(() => {
    dispatch({ type: LOGS_REPLACED, logs });
  }, [logs]);

  return (
    <History state={state} onUpdate={onUpdate} onDelete={onDelete} />
  )
}