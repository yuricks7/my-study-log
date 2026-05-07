import { useEffect, useReducer } from "react";
import { StudyLogUsecase } from "../../usecases/studyLogUsecase";

export const useStudyLog = () => {
  const [state, dispatch] = useReducer(studyLogReducer, initialState);

  // 初回ロード
  useEffect(() => {
    (async () => {
      const data = await StudyLogUsecase.fetchList();
      dispatch({ type: "SET_LIST", payload: data });
      dispatch({ type: "CALC_SUM" });
    })();
  }, []);

  // list が変わったら sum を再計算
  useEffect(() => {
    dispatch({ type: "CALC_SUM" }); // dispatchで更新された時だけ`state.list`が新しい参照になる
  }, [state.list]);

  // 入力ハンドラ
  const onChangeTitle = (e) =>
    dispatch({ type: "SET_TITLE", payload: e.target.value });

  const onChangeTime = (e) =>
    dispatch({ type: "SET_TIME", payload: e.target.value });

  // 追加
  const onClickAdd = async () => {
    const row = await StudyLogUsecase.add(state.title, Number(state.time));
    dispatch({ type: "ADD", payload: row });
    dispatch({ type: "SET_TITLE", payload: "" });
    dispatch({ type: "SET_TIME", payload: 0 });
  };

  // 更新
  const onClickUpdate = async (index) => {
    const log = state.list[index];
    const row = await StudyLogUsecase.update(
      log.id,
      state.title,
      Number(state.time)
    );
    dispatch({ type: "UPDATE", payload: row });
  };

  // 削除
  const onClickDelete = async (index) => {
    const log = state.list[index];
    await StudyLogUsecase.remove(log.id);
    dispatch({ type: "DELETE", payload: log.id });
  };

  return {
    state,
    onChangeTitle,
    onChangeTime,
    onClickAdd,
    onClickUpdate,
    onClickDelete
  };
};