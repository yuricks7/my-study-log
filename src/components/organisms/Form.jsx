import { useState } from "react";
import { FORM_RESET, LOG_ADDED, SET_TIME, SET_TITLE } from "../../state/studyLog";

import { ErrorMessage } from "../atoms/ErrorMessage";

import { PrimaryButton } from "../atoms/buttons/PrimaryButton";
import { AreaHeader } from "../atoms/headers/AreaHeader";

export const Form = (props) => {
  const { state, dispatch, onAdd } = props;
  const [error, setError] = useState("");

  /**
   * バリデーション
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.title.trim()) {
      setError('タイトルを入力してください');
      return;
    }
    if (state.time <= 0) {
      setError('時間は1以上を入力してください');
      return;
    }

    // 条件を満たしたら実行
    setError("");
    onAdd();
    dispatch({ type: FORM_RESET })
  }

  return (
    <div className='input-area' onSubmit={handleSubmit}>
      <AreaHeader>記録</AreaHeader>

      <form id="input-history">
        <textarea
          type="text"
          value={state.title}
          onChange={(e)=>
            dispatch({type: SET_TITLE, title: e.target.value})
          }
        />
        <br/>
        <input
          type="number"
          value={state.time}
          onChange={(e)=>
            dispatch({type: SET_TIME, time: Number(e.target.value)})
          }
        />時間
        <PrimaryButton type="submit">追加</PrimaryButton>
       </form>
      <ErrorMessage message={error} />
    </div>
  );
};