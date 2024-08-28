// src/const/extracurriculars.ts

import { Skills } from '../types';

export interface ExtraCurricular {
  name: string;
  skills: Skills[];
  members: string[];
}

export const EXTRA_CURRICULARS: ExtraCurricular[] = [
  {
    name: 'Dead Languages Society',
    skills: [Skills.Athletics, Skills.History],
    members: ['Drazhomir Yarnask', 'Quentillius Antiphiun Melentor III'],
  },
  {
    name: 'Distinguished Society of Fine Artists',
    skills: [Skills.Performance, Skills.SleightOfHand],
    members: ['Cadoras Damellawar', 'Nora Ann Wu'],
  },
  {
    name: 'Dragonchess Club',
    skills: [Skills.Deception, Skills.Investigation],
    members: ['Bhedum “Rampart” Sooviij', 'Tilana Kapule'],
  },
  {
    name: 'Dragonsguard Historical Society',
    skills: [Skills.Arcana, Skills.History],
    members: ['Bhedum “Rampart” Sooviij'],
  },
  {
    name: 'Fantastical Horticulture Club',
    skills: [Skills.Nature, Skills.Survival],
    members: ['Urzmaktok Grojsh'],
  },
  {
    name: 'Future Entrepreneurs of Strixhaven',
    skills: [Skills.Insight, Skills.Persuasion],
    members: ['Grayson Wildemere'],
  },
  {
    name: 'Intramural Gymnastics Club',
    skills: [Skills.Acrobatics, Skills.Performance],
    members: ['Zanther Bowen'],
  },
  {
    name: 'Intramural Silkball Club',
    skills: [Skills.Athletics, Skills.Intimidation],
    members: ['Javenesh Stoutclaw', 'Melwythorne', 'Tilana Kapule'],
  },
  {
    name: 'Intramural Water-Dancing Club',
    skills: [Skills.Athletics, Skills.Performance],
    members: ['Larine Arneza'],
  },
  {
    name: 'Live-Action Roleplaying Guild',
    skills: [Skills.AnimalHandling, Skills.Performance],
    members: ['Cadoras Damellawar', 'Rosimyffenbip “Rosie” Wuzfeddlims'],
  },
  {
    name: 'Mage Tower Cheer Squad',
    skills: [Skills.Perception, Skills.Persuasion],
    members: ['Zanther Bowen'],
  },
  {
    name: 'Playactors Drama Guild',
    skills: [Skills.Arcana, Skills.Deception],
    members: ['Quentillius Antiphiun Melentor III', 'Rubina Larkingdale'],
  },
  {
    name: 'Strixhaven Iron-Lifters Society',
    skills: [Skills.Athletics, Skills.Medicine],
    members: ['Greta Gorunn'],
  },
  {
    name: 'Strixhaven Show Band Association',
    skills: [Skills.SleightOfHand, Skills.Performance],
    members: ['Aurora Luna Wynterstarr', 'Rubina Larkingdale'],
  },
  {
    name: 'Strixhaven Star',
    skills: [Skills.Investigation, Skills.Insight],
    members: ['Grayson Wildemere', 'Mina Lee'],
  },
  {
    name: 'Student-Mages of Faith',
    skills: [Skills.Insight, Skills.Religion],
    members: ['Melwythorne', 'Shuvadri Glintmantle'],
  },
];
