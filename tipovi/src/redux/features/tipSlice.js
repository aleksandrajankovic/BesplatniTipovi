import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTip = createAsyncThunk(
  "tip/createTip",
  async ({ updatedTipData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTip(updatedTipData);
      toast.success("Tip Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTips = createAsyncThunk(
  "tip/getTips",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTips();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTip = createAsyncThunk(
  "tip/getTip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTip(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTip = createAsyncThunk(
  "tip/deleteTip",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTip(id);
      toast.success("Tip Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTip = createAsyncThunk(
  "tip/updateTip",
  async ({ id, updatedTipData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTip(updatedTipData, id);
      toast.success("Tip Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const likeTip = createAsyncThunk(
  "tip/likeTip",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTip(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const tipSlice = createSlice({
  name: "tip",
  initialState: {
    tip: {},
    tips: [],
    userTips: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createTip.pending]: (state, action) => {
      state.loading = true;
    },
    [createTip.fulfilled]: (state, action) => {
      state.loading = false;
      state.tip = [action.payload];
    },
    [createTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTips.pending]: (state, action) => {
      state.loading = true;
    },
    [getTips.fulfilled]: (state, action) => {
      state.loading = false;
      state.tips = action.payload;
    },
    [getTips.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTip.pending]: (state, action) => {
      state.loading = true;
    },
    [getTip.fulfilled]: (state, action) => {
      state.loading = false;
      state.tip = action.payload;
    },
    [getTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteTip.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTip.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTips = state.userTips.filter((item) => item._id !== id);
        state.tips = state.tips.filter((item) => item._id !== id);
      }
    },
    [deleteTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTip.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTip.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTips = state.userTips.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tips = state.tips.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeTip.pending]: (state, action) => {
      state.loading = true;
    },
    [likeTip.fulfilled]: (state, action) => {
      const likedTip = action.payload;

      if (likedTip) {
        const existingTipIndex = state.tips.findIndex(
          (tip) => tip._id === likedTip._id
        );

        if (existingTipIndex !== -1) {
          state.tips[existingTipIndex] = likedTip;
        } else {
          state.tips.push(likedTip);
        }
      } else {
        console.error(
          "Like tip error: Unexpected payload format",
          action.payload
        );
      }

      state.loading = false;
      state.error = undefined;
    },
    [likeTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Nepoznata greška";
    },
  },
});

export default tipSlice.reducer;
