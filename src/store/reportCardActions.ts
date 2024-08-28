// src/store/reportCardActions.ts

import { ReportCardEntry, ReportCards } from '../types';
import { StoreApi } from 'zustand';

interface ReportCardState {
  reportCards: ReportCards;
}

export const reportCardActions = (set: StoreApi<ReportCardState>['setState']) => ({
  updateReportCardEntry: (year: keyof ReportCards, index: number, entry: ReportCardEntry) =>
    set((state) => ({
      reportCards: {
        ...state.reportCards,
        [year]: state.reportCards[year].map((e, i) => (i === index ? entry : e)),
      },
    }), false),

  // Add new report card entry
  addReportCardEntry: (year: keyof ReportCards, newEntry: ReportCardEntry) =>
    set((state) => ({
      reportCards: {
        ...state.reportCards,
        [year]: [...state.reportCards[year], newEntry],
      },
    })),

  // Remove report card entry
  removeReportCardEntry: (year: keyof ReportCards, index: number) =>
    set((state) => ({
      reportCards: {
        ...state.reportCards,
        [year]: state.reportCards[year].filter((_, i) => i !== index),
      },
    })),
});
