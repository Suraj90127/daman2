// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { api } from "./api";



// wingo  game


export const wingoBet = createAsyncThunk(
  'bet/wingo-bet',
  async ({ typeid1, selectBet,  balance,multiplier }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/action/join',{ typeid:typeid1, join:selectBet, x:multiplier, money:balance }, {withCredentials:true});

   return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// k3  game


export const k3Bet = createAsyncThunk(
  'bet/k3-bet',
  async ({ typeid1,selectTab, selectBet,  totalbalance,multiplier }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/action/k3/join',{ game:typeid1, listJoin:selectBet,gameJoin:selectTab , xvalue:multiplier, money:totalbalance }, {withCredentials:true});
       return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const d5Bet = createAsyncThunk(
  'bet/d5-bet',
  async ({ typeid1,selectTab, selectBet,  balance,multiplier }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/action/5d/join',{ game:typeid1, list_join:selectBet,join:selectTab , x:multiplier, money:balance }, {withCredentials:true});
       return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);






export const betReducer = createSlice({
  name: 'bet',
  initialState: {
    loader: false,
    errorMessage: '',
    successMessage: '',
    wingoBetData:null,
    k3BetData:null,
    d5BetData:null,
     // add userDetail to initialState
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
    game_reset: (state) => {
    //   state.PeriodListData = null;
      // state.wingoBetData='';
    }
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(wingoBet.pending, (state) => {
        state.loader = true;
      })
      .addCase(wingoBet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(wingoBet.fulfilled, (state, { payload }) => {
        const wingoBetData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.wingoBetData = wingoBetData;
      })
     
      // k3
   
      .addCase(k3Bet.pending, (state) => {
        state.loader = true;
      })
      .addCase(k3Bet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(k3Bet.fulfilled, (state, { payload }) => {
        const k3BetData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.k3BetData = k3BetData;
      })
     
      .addCase(d5Bet.pending, (state) => {
        state.loader = true;
      })
      .addCase(d5Bet.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(d5Bet.fulfilled, (state, { payload }) => {
        const d5BetData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.d5BetData = d5BetData;
      })       
     
  }
});

export const { messageClear, games_reset } = betReducer.actions;
export default betReducer.reducer;
