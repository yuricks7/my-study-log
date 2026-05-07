import { supabase } from "./supabaseClient";
import { TABLE_NAME } from "../state/studyLog/utils";

export const StudyLogUsecase = {
  async fetchList() {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data;
  },

  async add(title, time) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({ title, time })
      .select();

    if (error) throw error;
    return data[0];
  },

  async update(id, title, time) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({ title, time })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", id);

    if (error) throw error;
    return id;
  }
};