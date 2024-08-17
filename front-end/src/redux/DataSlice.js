import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: undefined,
    userPic: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserPic: (state, action) => {
            state.userPic = action.payload;
        },
        resetData: (state) => {
            state.userId = undefined;
            state.userPic = undefined;
        }
    }
});

export const { setUserId, setUserPic, resetData } = userSlice.actions;

export default userSlice.reducer;