import React from 'react';
import { Job as JobType, JobOption } from '../types';
import useStore from '../store/useStore';
import { Table, Button, Checkbox, Select, Card } from 'flowbite-react';
import { JOBS } from '../const/jobs';
import { HiPlus } from 'react-icons/hi';
const Job: React.FC = () => {
  const { studentActivities, setJob, clearJob } = useStore((state) => state);
  const job = studentActivities.job;

  const handleInputChange = (field: keyof JobType, value: any) => {
    if (job) {
      const updatedJob = { ...job, [field]: value };
      setJob(updatedJob);
    }
  };

  const handleAddNewJob = () => {
    const newJob: JobType = { employer: '', jobTitle: '', coworker: '', d4Used: false };
    setJob(newJob);
  };

  const handleClearJob = () => {
    clearJob();
  };

  return (
    <Card className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Job</h2>
      {job ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Employer</Table.HeadCell>
            <Table.HeadCell>Job Title</Table.HeadCell>
            <Table.HeadCell>D4 Used</Table.HeadCell>
            <Table.HeadCell>Coworker</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <a
                    href={`https://dndbeyond.com/sources/dnd/sacoc/school-is-in-session#${job.employer.replace(/[\s""]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2 text-red-500 hover:text-red-700"
                  >
                    &amp;
                  </a>
                  <Select
                    id="employer-select"
                    value={job.employer}
                    onChange={(e) => handleInputChange('employer', e.target.value)}
                    className="flex-grow"
                  >
                    <option value="">Select an Employer</option>
                    {JOBS.map((job: JobOption) => (
                      <option key={job.employer} value={job.employer}>
                        {job.employer}
                      </option>
                    ))}
                  </Select>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Select
                  id="job-title-select"
                  value={job.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="flex-grow"
                >
                  <option value="">Select a Job Title</option>
                  {JOBS.find((j: JobOption) => j.employer === job.employer)?.jobTitles.map((jobTitle: string) => (
                    <option key={jobTitle} value={jobTitle}>
                      {jobTitle}
                    </option>
                  ))}
                </Select>
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={job.d4Used} onChange={(e) => handleInputChange('d4Used', e.target.checked)} />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {job.coworker && (
                    <a
                      href={`https://dndbeyond.com/sources/dnd/sacoc/relationships#${job.coworker.replace(
                        /[\s""]/g,
                        ''
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 text-red-500 hover:text-red-700"
                    >
                      &amp;
                    </a>
                  )}
                  <Select
                    id="coworker-select"
                    value={job.coworker}
                    onChange={(e) => handleInputChange('coworker', e.target.value)}
                    className="flex-grow"
                  >
                    <option value="">Select a Coworker</option>
                    {JOBS.find((j: JobOption) => j.employer === job.employer)?.coworkers.map((coworker: string) => (
                      <option key={coworker} value={coworker}>
                        {coworker}
                      </option>
                    ))}
                  </Select>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-end">
                  <Button color="failure" size="sm" onClick={handleClearJob}>
                    🗑️
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ) : (
        <Button color="purple" onClick={handleAddNewJob} className="mt-4">
          <HiPlus className="mr-2 h-5 w-5" />
          Add Job
        </Button>
      )}
    </Card>
  );
};

export default Job;
