// src/store/useStore.ts


import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { relationshipsActions } from './relationshipActions';
import { Relationship, ReportCards, ReportCardEntry, StudentActivities } from '../types';
import { reportCardActions } from './reportCardActions';
import { extracurricularActions } from './extracurricularActions';
import { jobActions } from './jobActions';

const defaultReportCardEntry: ReportCardEntry = {
    name: '',
    question1: false,
    question2: false,
    result: undefined,
    skill1: undefined,
    skill2: undefined,
    d4s: 0,
    d4sUsed: [],
    rerollsAvailable: 0,
    reroll1Used: false,
    reroll2Used: false
};
const useStore = create(
    persist(
      combine(
        {
          relationships: [
            {
              name: '',
              points: 0,
              relationship: '',
              inspiration: false,
              boonBane: '',
            },
          ] as Relationship[],
          reportCards: {
            'Year 1': [defaultReportCardEntry],
            'Year 2': [defaultReportCardEntry],
            'Year 3': [defaultReportCardEntry],
            'Year 4': [defaultReportCardEntry],
          } as ReportCards,
          studentActivities: {
            extracurriculars: [
              { name: '', d4Used: false, skills: [], member: '' },
              { name: '', d4Used: false, skills: [], member: '' },
            ],
            job: undefined,
          } as StudentActivities, // Using the StudentActivities type
        },
        (set) => ({
          ...relationshipsActions(set),
          ...reportCardActions(set),
          ...extracurricularActions(set),
          ...jobActions(set),
          exportData: () => {
            const data = {
              relationships: useStore.getState().relationships,
              reportCards: useStore.getState().reportCards,
              studentActivities: useStore.getState().studentActivities,
            };
            const jsonData = JSON.stringify(data);
            navigator.clipboard.writeText(jsonData);
          },
          importData: async () => {
            try {
              const clipboardData = await navigator.clipboard.readText();
              const parsedData = JSON.parse(clipboardData);
              set({
                relationships: parsedData.relationships || [],
                reportCards: parsedData.reportCards || {
                  'Year 1': [],
                  'Year 2': [],
                  'Year 3': [],
                  'Year 4': [],
                },
                studentActivities: parsedData.studentActivities || {
                  extracurriculars: [
                    { name: '', d4Used: false, skills: [], member: '' },
                    { name: '', d4Used: false, skills: [], member: '' },
                  ],
                  job: null,
                },
              });
              console.log('Data imported from clipboard!');
            } catch (error) {
              console.error('Error importing data from clipboard:', error);
            }
          },
        })
      ),
      {
        name: 'Strixhaven',
        getStorage: () => localStorage,
      }
    )
  );
  
  export default useStore;