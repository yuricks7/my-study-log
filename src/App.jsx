import "./App.css";
import { useEffect, useState, useReducer, Suspense } from 'react';

import { supabase } from "./usecases/supabaseClient";
import { TABLE_NAME } from "./state/studyLog/utils";
import { studyLogReducer, initialState, LOG_UPDATED, LOG_ADDED, LOG_REMOVED, LOGS_REPLACED, FORM_RESET, UPDATE_START, UPDATE_END } from "./state/studyLog";

import { createResource } from "./Loading/createResource";

// import { Main } from "./components/templates/Main";
import { Form } from "./components/organisms/Form";

import { HistoryLoader } from "./components/molecules/HistoryLoader";
import { LoadingScreen } from "./components/atoms/loadings/LoadingScreen";
import { LoadingSkeletonScreen } from "./components/atoms/loadings/LoadingSkeletonScreen";

// 初回ロード
const fetchLogs = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

export const logsResource = createResource(fetchLogs());

function App() {
  const [state, dispatch] = useReducer(studyLogReducer, initialState);

  // 追加
  const handleAdd = async () => {
    const newLog = { title: state.title, time: state.time };

    const { data } = await supabase
      .from(TABLE_NAME)
      .insert(newLog)
      .select()
      .single();

    dispatch({ type: LOG_ADDED, log: data });
  };

  // 更新
  const handleUpdate = async (log) => {
    dispatch({ type: UPDATE_START });

    const { data } = await supabase
      .from(TABLE_NAME)
      .update({ title: log.title, time: log.time })
      .eq("id", log.id)
      .select()
      .single();

    dispatch({ type: LOG_UPDATED, log: data });

    // 後処理
    dispatch({ type: FORM_RESET });
    dispatch({ type: UPDATE_END });
  };

  // 削除
  const handleDelete = async (id) => {
    await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", id);

      dispatch({ type: LOG_REMOVED, id });
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="container">
      <h1>学習記録アプリ</h1>

      <Form state={state} dispatch={dispatch} onAdd={handleAdd}/>
      <Suspense fallback={<LoadingSkeletonScreen/>}>
      {/* <Suspense fallback={<LoadingScreen />}> */}
        <HistoryLoader
          state={state} dispatch={dispatch}
          onUpdate={handleUpdate} onDelete={handleDelete}
        />
      </Suspense>
    </div>
  );
}

export default App;