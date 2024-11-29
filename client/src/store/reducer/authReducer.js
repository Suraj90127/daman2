// propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { api } from "./api";




export const register = createAsyncThunk(
  'auth/register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/register', info);

      Cookies.set('auth', data.value, { secure: true, sameSite: 'None',    });
      
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/login', info);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 5);

      // expires: expirationDate

      Cookies.set('auth', data.value, { secure: true, sameSite: 'None',    });

      // localStorage.setItem('token', data.user.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/login-admin',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/login-admin', info);
      Cookies.set('auth', data.value, { secure: true, sameSite: 'None' });
      // localStorage.setItem('token', data.user.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const userDetail = createAsyncThunk(
  'auth/user-details',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const ddd=Date.now()
    

      const { data } = await api.get(`/webapi/GetUserInfo?rand=${ddd}`,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const changeUserName = createAsyncThunk(
  'auth/change-user',
  async (name, { rejectWithValue, fulfillWithValue }) => {
    try {
    
      const { data } = await api.post('/webapi/change/userInfo', {name:name},{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const changeUserPhoto = createAsyncThunk(
  'auth/change-photo',
  async (photo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/change/userPhoto', {photo:photo},{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  'auth/change-password',
  async (state, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/change/pass', state,{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const recharge = createAsyncThunk(
  'auth/recharge',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
     
      const { data } = await api.post('/webapi/recharge', info, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const rechargeGet = createAsyncThunk(
  'auth/rechargeget',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/recharge/check',{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const rechargeList = createAsyncThunk(
  'auth/recharge-list',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/recharge/list',{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const addBank = createAsyncThunk(
  'auth/addbank',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/addBank',info, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const getBank = createAsyncThunk(
  'auth/getbank',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/check/Info', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const withdrawal = createAsyncThunk(
  'auth/withdraw',
  async ({type,password,money}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/withdrawal',{type,password,money}, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const withdrawalHistory = createAsyncThunk(
  'auth/withdraw-history',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/withdraw/list', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const RedeemGiftCode = createAsyncThunk(
  'auth/redeem',
  async (code, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/use/redenvelope',code, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const getRedeemGift = createAsyncThunk(
  'auth/redeem-get',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/get/redenvelope',{withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const promotions = createAsyncThunk(
  'auth/promotions',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/promotion', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const totalCommission = createAsyncThunk(
  'auth/totalcommission',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/totalcommission', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const myTeamReport = createAsyncThunk(
  'auth/myteam',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/downlinerecharge/list', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const myTeamReportSubordinate = createAsyncThunk(
  'auth/myteam-subordinate',
  async (date, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/downlinerecharge-data/list-data',{date:date}, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const myTeamReportSubordinate2 = createAsyncThunk(
  'auth/myteam-subordinate2',
  async ({date,auth}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/webapi/downlinerecharge-data/list-data-new',{date:date,auth:auth}, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const subordinates = createAsyncThunk(
  'auth/subordinate',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/subordinatedata', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const commissiondatas = createAsyncThunk(
  'auth/commissiondatas',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/commissiondata', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const transactionHistory = createAsyncThunk(
  'auth/transaction-history',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/transactionhistory', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const notification = createAsyncThunk(
  'auth/notification',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/webapi/notification', {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const notificationDelete = createAsyncThunk(
  'auth/notification-delete',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/notification`,{id:id}, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);
export const attendance = createAsyncThunk(
  'auth/attendance',
  async (datas, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/checkIn`,{data:datas}, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const newSubordinate = createAsyncThunk(
  'auth/new-subordinate',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/new-subordinate`, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const invitationBonus = createAsyncThunk(
  'auth/invitation-bonus',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/calculateDownlineBonuses`, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const rebateCreate = createAsyncThunk(
  'auth/rebate',
  async (amount, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/rebateCreate`,{amount:amount}, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const rebateget = createAsyncThunk(
  'auth/rebate-get',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/getRebate`, {withCredentials:true});
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
  }
);

export const notificationgets = createAsyncThunk(
  'auth/notification-get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/get-Notification`,{withCredentials:true});
      return data; // Return data directly
    } catch (error) {
      // Log error to debug
      console.error('Error fetching notifications:', error);

      // Return a custom error message or error response
      return rejectWithValue(
        error.response ? error.response.data : 'An unknown error occurred'
      );
    }
  }
);

export const vipLevel = createAsyncThunk(
  'auth/vip-level',
  async (_, { rejectWithValue,fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/webapi/vip-level`,{withCredentials:true});
      return fulfillWithValue(data); // Return data directly
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'An unknown error occurred'
      );
    }
  }
);

export const emailotp = createAsyncThunk(
  'auth/email-otp',
  async (email, { rejectWithValue,fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/email-otp`,{email:email},{withCredentials:true});
      return fulfillWithValue(data); // Return data directly
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'An unknown error occurred'
      );
    }
  }
);

export const emailsubmit = createAsyncThunk(
  'auth/email-submit',
  async ({otp,email}, { rejectWithValue,fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/email`,{otp:otp,email:email},{withCredentials:true});
      return fulfillWithValue(data); // Return data directly
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'An unknown error occurred'
      );
    }
  }
)

export const emailLogin = createAsyncThunk(
  'auth/email-login',
  async ({email,pwd}, { rejectWithValue,fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/webapi/login-email`,{email:email,pwd:pwd});
      Cookies.set('auth', data.value, { secure: true, sameSite: 'None' });
      return fulfillWithValue(data); // Return data directly
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'An unknown error occurred'
      );
    }
  }
);




export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    loader: false,
    loadergift:false,
    userInfo: null,
    errorMessage: '',
    successMessage: '',
    rechargeData: null,
    rechargegetData: null,
    rechargelistData: null,
notificationgetData:null
     // add userDetail to initialState
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
    user_reset: (state) => {
      state.userInfo = '';
      state.rechargeData = '';
      state.rechargegetData = '';
      state.rechargelistData = '';
      state.notificationgetData='';

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loader = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const userInfo = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(login.pending, (state) => {
        state.loader = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const userInfo = payload.value;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        const userInfo = payload.value;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })


      .addCase(emailLogin.pending, (state) => {
        state.loader = true;
      })
      .addCase(emailLogin.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(emailLogin.fulfilled, (state, { payload }) => {
        const userInfo = payload.value;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(userDetail.pending, (state) => {
        state.loader = true;
      })
      .addCase(userDetail.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(userDetail.fulfilled, (state, { payload }) => {
        const userInfo = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(changeUserName.pending, (state) => {
        state.loader = true;
      })
      .addCase(changeUserName.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(changeUserName.fulfilled, (state, { payload }) => {
        const userInfo = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(changeUserPhoto.pending, (state) => {
        state.loader = true;
      })
      .addCase(changeUserPhoto.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(changeUserPhoto.fulfilled, (state, { payload }) => {
        const userInfo = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(changePassword.pending, (state) => {
        state.loader = true;
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        const userInfo = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(recharge.pending, (state) => {
        state.loader = true;
      })
      .addCase(recharge.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(recharge.fulfilled, (state, { payload }) => {
        const rechargeData = payload.orderid;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargeData = rechargeData;
      })
      .addCase(rechargeGet.pending, (state) => {
        state.loader = true;
      })
      .addCase(rechargeGet.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(rechargeGet.fulfilled, (state, { payload }) => {
        const rechargegetData = payload.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargegetData = rechargegetData;
      })
      .addCase(rechargeList.pending, (state) => {
        state.loader = true;
      })
      .addCase(rechargeList.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(rechargeList.fulfilled, (state, { payload }) => {
        const rechargelistData = payload.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.rechargelistData = rechargelistData;
      })
      .addCase(addBank.pending, (state) => {
        state.loader = true;
      })
      .addCase(addBank.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(addBank.fulfilled, (state, { payload }) => {
        const addBankData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.addBankData = addBankData;
      })
      .addCase(getBank.pending, (state) => {
        state.loader = true;
      })
      .addCase(getBank.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(getBank.fulfilled, (state, { payload }) => {
        const addBankData = payload?.datas[0];
        state.successMessage = payload.message;
        state.loader = false;
        state.addBankData = addBankData;
      })
      .addCase(withdrawal.pending, (state) => {
        state.loader = true;
      })
      .addCase(withdrawal.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(withdrawal.fulfilled, (state, { payload }) => {
        const withdrawData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdrawData = withdrawData;
      })
      .addCase(withdrawalHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(withdrawalHistory.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(withdrawalHistory.fulfilled, (state, { payload }) => {
        const withdrawHistoryData = payload.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.withdrawHistoryData = withdrawHistoryData;
      })
      .addCase(RedeemGiftCode.pending, (state) => {
        state.loadergift = true;
      })
      .addCase(RedeemGiftCode.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loadergift = false;
      })
      .addCase(RedeemGiftCode.fulfilled, (state, { payload }) => {
        const redeemData = payload.datas;
        state.successMessage = payload.message;
        state.loadergift = false;
        state.redeemData = redeemData;
      })
      .addCase(getRedeemGift.pending, (state) => {
        state.loader = true;
      })
      .addCase(getRedeemGift.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(getRedeemGift.fulfilled, (state, { payload }) => {
        const redeemData = payload.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.redeemData = redeemData;
      })
      .addCase(promotions.pending, (state) => {
        state.loader = true;
      })
      .addCase(promotions.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(promotions.fulfilled, (state, { payload }) => {
        const promotionsData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.promotionsData = promotionsData;
      })
      .addCase(totalCommission.pending, (state) => {
        state.loader = true;
      })
      .addCase(totalCommission.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(totalCommission.fulfilled, (state, { payload }) => {
        const totalCommissionData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.totalCommissionData = totalCommissionData;
      })
      .addCase(myTeamReport.pending, (state) => {
        state.loader = true;
      })
      .addCase(myTeamReport.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(myTeamReport.fulfilled, (state, { payload }) => {
        const myTeamReportData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.myTeamReportData = myTeamReportData;
      })

      .addCase(myTeamReportSubordinate.pending, (state) => {
        state.loader = true;
      })
      .addCase(myTeamReportSubordinate.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(myTeamReportSubordinate.fulfilled, (state, { payload }) => {
        const mySubordinateData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.mySubordinateData = mySubordinateData;
      })

      .addCase(myTeamReportSubordinate2.pending, (state) => {
        state.loader = true;
      })
      .addCase(myTeamReportSubordinate2.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(myTeamReportSubordinate2.fulfilled, (state, { payload }) => {
        const mySubordinateData2 = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.mySubordinateData2 = mySubordinateData2;
      })
      .addCase(subordinates.pending, (state) => {
        state.loader = true;
      })
      .addCase(subordinates.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(subordinates.fulfilled, (state, { payload }) => {
        const subordinatesData = payload.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.subordinatesData = subordinatesData;
      })
      .addCase(transactionHistory.pending, (state) => {
        state.loader = true;
      })
      .addCase(transactionHistory.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(transactionHistory.fulfilled, (state, { payload }) => {
        const transactionHistoryData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.transactionHistoryData = transactionHistoryData;
      })
      .addCase(notification.pending, (state) => {
        state.loader = true;
      })
      .addCase(notification.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(notification.fulfilled, (state, { payload }) => {
        const notificationData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.notificationData = notificationData;
      })
      .addCase(notificationDelete.pending, (state) => {
        state.loader = true;
      })
      .addCase(notificationDelete.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(notificationDelete.fulfilled, (state, { payload }) => {
        const notificationData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.notificationData = notificationData;
      })
      .addCase(attendance.pending, (state) => {
        state.loader = true;
      })
      .addCase(attendance.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(attendance.fulfilled, (state, { payload }) => {
        const attendanceData = payload?.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.attendanceData = attendanceData;
        const attendance_history=payload?.data
        state.attendance_history=attendance_history
      })
      .addCase(newSubordinate.pending, (state) => {
        state.loader = true;
      })
      .addCase(newSubordinate.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(newSubordinate.fulfilled, (state, { payload }) => {
        const newSubordinateData = payload?.datas;
        state.successMessage = payload.message;
        state.loader = false;
        state.newSubordinateData = newSubordinateData;
      })
      .addCase(invitationBonus.pending, (state) => {
        state.loader = true;
      })
      .addCase(invitationBonus.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(invitationBonus.fulfilled, (state, { payload }) => {
        const invitationBonusData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.invitationBonusData = invitationBonusData;
      })
      .addCase(rebateCreate.pending, (state) => {
        state.loader = true;
      })
      .addCase(rebateCreate.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(rebateCreate.fulfilled, (state, { payload }) => {
        const rebateData = payload;
        state.successMessage = payload.message;
        state.loader = false;
        state.rebateData = rebateData;
      })
      .addCase(rebateget.pending, (state) => {
        state.loader = true;
      })
      .addCase(rebateget.rejected, (state, { payload }) => {
        // console.log('register rejected payload:', payload); // Log payload
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(rebateget.fulfilled, (state, { payload }) => {
        const rebateData = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.rebateData = rebateData;
      })
      .addCase(notificationgets.pending, (state) => {
        state.loader = true;
      })
      .addCase(notificationgets.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(notificationgets.fulfilled, (state, { payload }) => {
        console.log('notificationgets fulfilled payload:', payload); // Log payload
        state.successMessage = payload.message || '';
        state.notificationgetData = payload.data || [];
        state.loader = false;
      })
      .addCase(vipLevel.pending, (state) => {
        state.loader = true;
      })
      .addCase(vipLevel.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(vipLevel.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message || '';
        state.vipLevelData = payload.data || [];
        state.loader = false;
      })

      .addCase(emailotp.pending, (state) => {
        state.loader = true;
      })
      .addCase(emailotp.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(emailotp.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message || '';
        state.emailotpData = payload.data || [];
        state.loader = false;
      })

      .addCase(emailsubmit.pending, (state) => {
        state.loader = true;
      })
      .addCase(emailsubmit.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(emailsubmit.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message || '';
        state.emailotpData = payload.data || [];
        state.loader = false;
      })

      .addCase(commissiondatas.pending, (state) => {
        state.loader = true;
      })
      .addCase(commissiondatas.rejected, (state, { payload }) => {
        state.errorMessage = payload?.errorMessage || 'An error occurred';
        state.loader = false;
      })
      .addCase(commissiondatas.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message || '';
        state.commissiondatasData = payload.datas || [];
        state.loader = false;
      });
     
  }
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
