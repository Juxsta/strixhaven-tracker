import React from 'react';
import { ReportCards as Cards, ReportCardEntry, Result, Skills } from '../types';
import useStore from '../store/useStore';
import { Accordion, Badge, Button, Card, Checkbox, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react';
import { HiPlus, HiTrash } from 'react-icons/hi';
import MobileNumberInput from './MobileNumberInput'; // Import the MobileNumberInput component

const ReportCards: React.FC = () => {
  const { reportCards, updateReportCardEntry, addReportCardEntry, removeReportCardEntry } = useStore((state) => ({
    reportCards: state.reportCards,
    updateReportCardEntry: state.updateReportCardEntry,
    addReportCardEntry: state.addReportCardEntry,
    removeReportCardEntry: state.removeReportCardEntry,
  }));

  const handleQuestionToggle = (year: keyof Cards, examIndex: number, question: 'question1' | 'question2') => {
    const entries = reportCards[year] as ReportCardEntry[];
    const currentEntry = entries[examIndex];

    if (currentEntry) {
      const updatedEntry = {
        ...currentEntry,
        [question]: !currentEntry[question],
      };
      const result = calculateExamResult(updatedEntry);
      const d4s = calculateD4s(result);
      updateReportCardEntry(year, examIndex, {
        ...updatedEntry,
        result: result,
        d4s: d4s,
      });
    }
  };

  const handleRerollUsedToggle = (year: keyof Cards, examIndex: number, rerollIndex: 1 | 2) => {
    const entries = reportCards[year] as ReportCardEntry[];
    const currentEntry = entries[examIndex];

    if (currentEntry) {
      const rerollProp = `reroll${rerollIndex}Used` as keyof ReportCardEntry;
      updateReportCardEntry(year, examIndex, {
        ...currentEntry,
        [rerollProp]: !currentEntry[rerollProp],
      });
    }
  };

  const calculateExamResult = (entry: ReportCardEntry): Result => {
    if (entry.question1 && entry.question2) {
      return Result.Aced;
    } else if (entry.question1 || entry.question2) {
      return Result.Passed;
    } else {
      return Result.Failed;
    }
  };

  const calculateD4s = (result: Result): number => {
    if (result === Result.Aced) {
      return 2;
    } else if (result === Result.Passed) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <Card className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Report Cards</h2>
      <Accordion
        alwaysOpen={false}
      >
        {Object.entries(reportCards).map(([year, entries]) => (
          <Accordion.Panel
            key={year}
          >
            <Accordion.Title>{year}</Accordion.Title>
            <Accordion.Content>
              {entries.map((entry: ReportCardEntry, examIndex: number) => (
                <div className='flex flex-col md:flex-row' key={examIndex}>
                  <Card
                    key={examIndex}
                    className={`flex-grow mt-4 rounded-br-none rounded-tr-none ${entry.result === Result.Failed
                      ? 'bg-red-100'
                      : entry.result === Result.Passed
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                      }`}
                  >
                    <div className="flex-grow">
                      <div className="mb-2">
                        <Label htmlFor={`examName-${year}-${examIndex}`}>Exam Name:</Label>
                        <TextInput
                          id={`examName-${year}-${examIndex}`}
                          value={entry.name}
                          onChange={(e) =>
                            updateReportCardEntry(year as keyof Cards, examIndex, { ...entry, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <Label htmlFor={`skill1-${year}-${examIndex}`}>Skill 1:</Label>
                          <Select
                            id={`skill1-${year}-${examIndex}`}
                            value={entry.skill1}
                            onChange={(e) =>
                              updateReportCardEntry(year as keyof Cards, examIndex, {
                                ...entry,
                                skill1: e.target.value as Skills,
                              })
                            }
                          >
                            <option value="">Select Skill</option>
                            {Object.values(Skills).map((skill) => (
                              <option key={skill} value={skill}>
                                {skill}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`skill2-${year}-${examIndex}`}>Skill 2:</Label>
                          <Select
                            id={`skill2-${year}-${examIndex}`}
                            value={entry.skill2}
                            onChange={(e) =>
                              updateReportCardEntry(year as keyof Cards, examIndex, {
                                ...entry,
                                skill2: e.target.value as Skills,
                              })
                            }
                          >
                            <option value="">Select Skill</option>
                            {Object.values(Skills).map((skill) => (
                              <option key={skill} value={skill}>
                                {skill}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="mb-2">
                        <Label htmlFor={`rerolls-${year}-${examIndex}`}>Rerolls Available:</Label>
                        <div className="md:hidden">
                          <MobileNumberInput
                            className="mt-2"
                            value={entry.rerollsAvailable}
                            onIncrement={() => updateReportCardEntry(year as keyof Cards, examIndex, {
                              ...entry,
                              rerollsAvailable: Math.min(entry.rerollsAvailable + 1, 2),
                            })}
                            onDecrement={() => updateReportCardEntry(year as keyof Cards, examIndex, {
                              ...entry,
                              rerollsAvailable: Math.max(0, entry.rerollsAvailable - 1),
                            })}
                            onChange={(value) => updateReportCardEntry(year as keyof Cards, examIndex, {
                              ...entry,
                              rerollsAvailable: value,
                            })}
                          />
                        </div>
                        <div className="hidden md:block">
                          <TextInput
                            id={`rerolls-${year}-${examIndex}`}
                            type="number"
                            min="0"
                            max="2"
                            className="w-full text-center"
                            value={entry.rerollsAvailable}
                            onChange={(e) => updateReportCardEntry(year as keyof Cards, examIndex, {
                              ...entry,
                              rerollsAvailable: parseInt(e.target.value, 10) || 0,
                            })}
                          />
                        </div>
                        {entry.rerollsAvailable > 0 && (
                          <div className="mt-2 space-x-2 flex items-center">
                            {Array.from({ length: entry.rerollsAvailable }).map((_, rerollIndex) => (
                              <div key={rerollIndex} className="flex items-center">
                                <Checkbox
                                  id={`reroll-${year}-${examIndex}-${rerollIndex + 1}`}
                                  checked={entry[`reroll${rerollIndex + 1}Used` as keyof ReportCardEntry] as boolean}
                                  onChange={() => handleRerollUsedToggle(year as keyof Cards, examIndex, (rerollIndex + 1) as 1 | 2)}
                                />
                                <Label htmlFor={`reroll-${year}-${examIndex}-${rerollIndex + 1}`} className="ml-2">
                                  Reroll {rerollIndex + 1} Used
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center">
                          <Label htmlFor={`question1-${year}-${examIndex}`} className="mr-2">Q1:</Label>
                          <ToggleSwitch
                            id={`question1-${year}-${examIndex}`}
                            checked={entry.question1 || false}
                            onChange={() => handleQuestionToggle(year as keyof Cards, examIndex, 'question1')}
                          />
                        </div>
                        <div className="flex items-center">
                          <Label htmlFor={`question2-${year}-${examIndex}`} className="mr-2">Q2:</Label>
                          <ToggleSwitch
                            id={`question2-${year}-${examIndex}`}
                            checked={entry.question2 || false}
                            onChange={() => handleQuestionToggle(year as keyof Cards, examIndex, 'question2')}
                          />
                        </div>
                        <Badge
                          color={
                            entry.result === Result.Failed
                              ? 'failure'
                              : entry.result === Result.Passed
                                ? 'success'
                                : 'info'
                          }
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full `}
                        >
                          {entry.result}
                        </Badge>
                      </div>
                      {(entry.result === Result.Passed || entry.result === Result.Aced) && (
                        <div className="mt-2">
                          <Label>D4 Bonus:</Label>
                          <div className="flex items-center space-x-2">
                            {Array.from({ length: entry.d4s }).map((_, d4Index) => (
                              <div key={d4Index} className="flex items-center">
                                <Checkbox
                                  id={`d4-${year}-${examIndex}-${d4Index + 1}`}
                                  checked={entry.d4sUsed[d4Index] || false}
                                  onChange={() => {
                                    const updatedD4sUsed = [...entry.d4sUsed];
                                    updatedD4sUsed[d4Index] = !updatedD4sUsed[d4Index];
                                    updateReportCardEntry(year as keyof Cards, examIndex, {
                                      ...entry,
                                      d4sUsed: updatedD4sUsed,
                                    });
                                  }}
                                />
                                <Label htmlFor={`d4-${year}-${examIndex}-${d4Index + 1}`} className="ml-2">
                                  D4 {d4Index + 1} Used
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                  {examIndex > 0 && (
                    <Button
                      color="failure"
                      className="md:flex items-center justify-center mt-4 rounded-bl-none rounded-tl-none md:ml-2" // Adjusted classes for responsive design
                      onClick={() => removeReportCardEntry(year as keyof Cards, examIndex)}
                    >
                      <HiTrash className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                color="purple"
                className="mt-4 w-full" // Added w-full to make the button full width
                onClick={() => {
                  const newEntry = {
                    name: '',
                    skill1: undefined,
                    skill2: undefined,
                    rerollsAvailable: 0,
                    reroll1Used: false,
                    reroll2Used: false,
                    question1: false,
                    question2: false,
                    result: undefined,
                    d4s: 0,
                    d4sUsed: [],
                  };
                  addReportCardEntry(year as keyof Cards, newEntry);
                }}
              >
                <HiPlus className="mr-2 h-5 w-5" />
                Add Exam
              </Button>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </Card>
  );
};

export default ReportCards;