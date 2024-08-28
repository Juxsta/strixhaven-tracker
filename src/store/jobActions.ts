// src/store/jobActions.ts

import { Job, StudentActivities } from '../types';
import { StoreApi } from 'zustand';

interface JobState {
  studentActivities: StudentActivities;
}

export const jobActions = (set: StoreApi<JobState>['setState']) => ({
  setJob: (job: Job) =>
    set((state) => ({
      studentActivities: {
        ...state.studentActivities,
        job,
      },
    })),

  clearJob: () =>
    set((state) => ({
      studentActivities: {
        ...state.studentActivities,
        job: undefined,
      },
    })),
});
