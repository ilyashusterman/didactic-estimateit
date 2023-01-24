import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { createStore } from 'redux';

const initialState = {
    tasks: [],
    financialProjections: [],
    animatedDiagramData: [],
};

export const addTask = createAsyncThunk(
    'task/addTask',
    async (amount: number) => {
        //   const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return amount;
    }
);


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addTask: (state) => {
            state.value += 1;
        },
        addFinancialProjection: (state) => {
            state.value -= 1;
        },
        addAnimatedDiagramData: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.status = 'loading';
            })
        // .addCase(incrementAsync.fulfilled, (state, action) => {
        //     state.status = 'idle';
        //     state.value += action.payload;
        // })
        // .addCase(incrementAsync.rejected, (state) => {
        //     state.status = 'failed';
        // });
    },
});


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.task] };
        case 'ADD_FINANCIAL_PROJECTION':
            return { ...state, financialProjections: [...state.financialProjections, action.projection] };
        case 'ADD_ANIMATED_DIAGRAM_DATA':
            return { ...state, animatedDiagramData: [...state.animatedDiagramData, action.data] };
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;
