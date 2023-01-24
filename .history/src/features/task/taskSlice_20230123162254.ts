import { createStore } from 'redux';

const initialState = {
    tasks: [],
    financialProjections: [],
    animatedDiagramData: [],
};

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
