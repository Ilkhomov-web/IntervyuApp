import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'intervyu:active-study-plan';

const loadInitial = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const studyPlanSlice = createSlice({
  name: 'studyPlan',
  initialState: {
    activePlan: null,
    startedAt: null,
  },
  reducers: {
    setActivePlan(state, action) {
      const plan = action.payload;
      state.activePlan = plan;
      state.startedAt = plan ? new Date().toISOString() : null;
      if (typeof window !== 'undefined') {
        if (plan) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ activePlan: plan, startedAt: state.startedAt }),
          );
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    },
    hydrateFromStorage(state) {
      const stored = loadInitial();
      if (stored) {
        state.activePlan = stored.activePlan;
        state.startedAt = stored.startedAt;
      }
    },
  },
});

export const { setActivePlan, hydrateFromStorage } = studyPlanSlice.actions;

export const selectActivePlan = (state) => state.studyPlan.activePlan;
export const selectPlanStartedAt = (state) => state.studyPlan.startedAt;

export default studyPlanSlice.reducer;
