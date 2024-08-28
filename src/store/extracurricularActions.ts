
import { Extracurricular, StudentActivities } from '../types';
import { StoreApi } from 'zustand';
interface ExtracurricularState {
  studentActivities: StudentActivities;
}

export const extracurricularActions = (set: StoreApi<ExtracurricularState>['setState']) => ({
  addExtracurricular: (extracurricular: Extracurricular) =>
    set((state) => ({
      studentActivities: {
        ...state.studentActivities,
        extracurriculars: [
          ...state.studentActivities.extracurriculars,
          extracurricular,
        ],
      },
    })),

  updateExtracurricular: (index: number, extracurricular: Extracurricular) =>
    set((state) => ({
      studentActivities: {
        ...state.studentActivities,
        extracurriculars: state.studentActivities.extracurriculars.map(
          (e, i) => (i === index ? extracurricular : e)
        ),
      },
    })),

  deleteExtracurricular: (index: number) =>
    set((state) => ({
      studentActivities: {
        ...state.studentActivities,
        extracurriculars: state.studentActivities.extracurriculars.filter(
          (_, i) => i !== index
        ),
      },
    })),
});
