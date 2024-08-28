export interface Relationship {
    name: string;
    points: number; 
    relationship: string;
    inspiration: boolean;
    boonBane: string;
  }

  export enum Result {
    Failed = 'Failed',
    Passed = 'Passed',
    Aced = 'Aced'
  }

  export interface ReportCardEntry {
    name: string;
    question1?: boolean;
    question2?: boolean;
    result?: Result;
    skill1?: Skills;
    skill2?: Skills;
    d4s: number;
    d4sUsed: boolean [];
    rerollsAvailable: number;
    reroll1Used?: boolean;
    reroll2Used?: boolean;
  }
  
  export interface ReportCards {
    'Year 1': ReportCardEntry[];
    'Year 2': ReportCardEntry[];
    'Year 3': ReportCardEntry[];
    'Year 4': ReportCardEntry[];
  }
  
  export interface Extracurricular {
    name: string;
    d4Used: boolean; // Track if the d4 from this extracurricular is used
    skills: Skills[]; // Array of skills associated with the extracurricular
    member: string;   // Name of the NPC member
  }
  
  export interface Job {
    employer: string;
    jobTitle: string; // More descriptive name than just "job"
    coworker: string;
    d4Used: boolean; // Track if the d4 from this job is used
  }
  
  export interface JobOption {
    employer: string;
    jobTitles: string[];
    coworkers: string[];
  }
  
  // We'll use a union type to represent either two extracurriculars or one extracurricular and one job
// No longer using a union type, as we're not enforcing the combination rule
export interface StudentActivities {
  extracurriculars: Extracurricular[];
  job?: Job ;
}

export enum Skills {
    Acrobatics = "Acrobatics",
    AnimalHandling = "Animal Handling",
    Arcana = "Arcana",
    Athletics = "Athletics",
    Deception = "Deception",
    History = "History",
    Insight = "Insight",
    Intimidation = "Intimidation",
    Investigation = "Investigation",
    Medicine = "Medicine",
    Nature = "Nature",
    Perception = "Perception",
    Performance = "Performance",
    Persuasion = "Persuasion",
    Religion = "Religion",
    SleightOfHand = "Sleight of Hand",
    Stealth = "Stealth",
    Survival = "Survival"
  }
