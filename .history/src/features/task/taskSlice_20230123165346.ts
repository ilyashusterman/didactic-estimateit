import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TaskState {
    tasks: any[];
    financialProjections: any[];
    animatedDiagramData: any[];
    selectSystemTasks: any[];
    status: 'idle' | 'loading' | 'failed';
}


const initialState: TaskState = {
    tasks: [],
    selectSystemTasks: [],
    financialProjections: [],
    animatedDiagramData: [],
    status: 'idle'
};

export const addTaskAsync = createAsyncThunk(
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
        addTask: (state, action: PayloadAction<any>) => {
            debugger
            state.tasks = [...state.tasks, action.payload.task];
        },
        addFinancialProjection: (state) => {
            // state.value -= 1;
        },
        // addAnimatedDiagramData: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        // builder
        // .addCase(addTask.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(incrementAsync.fulfilled, (state, action) => {
        //     state.status = 'idle';
        //     state.value += action.payload;
        // })
        // .addCase(incrementAsync.rejected, (state) => {
        //     state.status = 'failed';
        // });
    },
});


export const { addTask, addFinancialProjection } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTasks = (state: RootState) => state.task.tasks;
export const selectTasks = (state: RootState) => state.task.selectSystemTasks;


export default taskSlice.reducer;
