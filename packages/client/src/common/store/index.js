import { configureStore } from '@reduxjs/toolkit';
import studyPlanReducer from '@slices/study-plan';

export const store = configureStore({
  reducer: {
    studyPlan: studyPlanReducer,
  },
});

export default store;
