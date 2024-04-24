import { IPosition } from "@/types/todo";
import { createSlice } from "@reduxjs/toolkit";

type QueryParams = {
  page: string;
  limit: string;
  search?: string;
  position?: string;
};

interface InitialStateProps {
  positions: IPosition[] | null;
  queryParams: QueryParams;
  deleteId: null | string;
  updateId: null | string;
}

const initialState: InitialStateProps = {
  positions: null,
  deleteId: null,
  updateId: null,
  queryParams: {
    page: "1",
    limit: "10",
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions =
        state.positions == action.payload ? null : action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    setUpdateId: (state, action) => {
      state.updateId = action.payload;
    },
    updateParams: (state, action) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
    },
  },
});

export const { setPositions, setUpdateId, setDeleteId, updateParams } =
  todoSlice.actions;
export default todoSlice.reducer;
