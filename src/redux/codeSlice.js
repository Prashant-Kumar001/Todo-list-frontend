import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allCode: [],
};

const codeSlice = createSlice({
    name: 'codeCopy',
    initialState,
    reducers: {
        addCode: (state, action) => {
            const existingIndex = state.allCode.findIndex(code => code.id == action.payload.id);
            if (existingIndex !== -1) {
                state.allCode[existingIndex] = action.payload;
            } else {
                state.allCode.push(action.payload);
            }
        },
        deleteCode: (state, action) => {
            state.allCode = state.allCode.filter((code) => code.id !== action.payload);
        },
       
    },
});


export const { addCode, deleteCode } = codeSlice.actions;


export default codeSlice.reducer;
