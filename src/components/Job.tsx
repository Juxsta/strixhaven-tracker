import React from 'react';
import { Job as JobType, JobOption } from '../types';
import useStore from '../store/useStore';
import { Table, Button, Select, Card, Label } from 'flowbite-react';
import { JOBS } from '../const/jobs';
import { HiPlus } from 'react-icons/hi';
import DNDBeyondLink from './DNDBeyondLink';
import { HiTrash } from 'react-icons/hi';
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
    const newJob: JobType = { employer: '', jobTitle: '', coworker: '' };
    setJob(newJob);
  };

  const handleClearJob = () => {
    clearJob();
  };

  const renderMobileView = () => (
    <div className="space-y-4">
      {job && (
        <Card>
          <div className="space-y-4">
            <div>
              <Label className="block mb-2 font-bold">Employer</Label>
              <div className="flex items-center">
                {job.employer && (
                  <DNDBeyondLink
                    text={job.employer}
                    baseUrl="https://dndbeyond.com/sources/dnd/sacoc/"
                    section="school-is-in-session#"
                  />
                )}
                <Select
                  id="employer-select"
                  value={job.employer}
                  onChange={(e) => handleInputChange('employer', e.target.value)}
                  className="w-full"
                >
                  <option value="">Select an Employer</option>
                  {JOBS.map((jobOption: JobOption) => (
                    <option key={jobOption.employer} value={jobOption.employer}>
                      {jobOption.employer}
                    </option>
                  ))}
                </Select>
              </div>

            </div>
            <div>
              <Label className="block mb-2 font-bold">Job Title</Label>
              <Select
                id="job-title-select"
                value={job.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full"
              >
                <option value="">Select a Job Title</option>
                {JOBS.find((j: JobOption) => j.employer === job.employer)?.jobTitles.map((jobTitle: string) => (
                  <option key={jobTitle} value={jobTitle}>
                    {jobTitle}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="block mb-2 font-bold">Coworker</Label>
              <div className="flex items-center">
                {job.coworker && (
                  <DNDBeyondLink
                    text={job.coworker}
                    baseUrl="https://dndbeyond.com/sources/dnd/sacoc/"
                    section="relationships#"
                  />
                )}
                <Select
                  id="coworker-select"
                  value={job.coworker}
                  onChange={(e) => handleInputChange('coworker', e.target.value)}
                  className="w-full"
                >
                  <option value="">Select a Coworker</option>
                  {JOBS.find((j: JobOption) => j.employer === job.employer)?.coworkers.map((coworker: string) => (
                    <option key={coworker} value={coworker}>
                      {coworker}
                    </option>
                  ))}
                </Select>

              </div>
            </div>
            <Button color="failure" onClick={handleClearJob} className="w-full">
              <HiTrash className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  const renderDesktopView = () => (
    <Table>
      <Table.Head>
        <Table.HeadCell>Employer</Table.HeadCell>
        <Table.HeadCell>Job Title</Table.HeadCell>
        <Table.HeadCell>Coworker</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {job && (
          <Table.Row>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">
                {job.employer && (
                  <DNDBeyondLink
                    text={job.employer}
                    baseUrl="https://dndbeyond.com/sources/dnd/sacoc/"
                    section="school-is-in-session#"
                  />
                )}
                <Select
                  id="employer-select"
                  value={job.employer}
                  onChange={(e) => handleInputChange('employer', e.target.value)}
                  className="flex-grow"
                >
                  <option value="">Select an Employer</option>
                  {JOBS.map((jobOption: JobOption) => (
                    <option key={jobOption.employer} value={jobOption.employer}>
                      {jobOption.employer}
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
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
              {job.coworker && (
                <DNDBeyondLink
                  text={job.coworker}
                  baseUrl="https://dndbeyond.com/sources/dnd/sacoc/"
                  section="relationships#"
                />
              )}
            </Table.Cell>
            <Table.Cell>
              <Button color="failure" onClick={handleClearJob}>
                <HiTrash className="h-5 w-5" />
              </Button>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );

  return (
    <Card className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Job</h2>
      <div className="hidden md:block">
        {renderDesktopView()}
      </div>
      <div className="md:hidden">
        {renderMobileView()}
      </div>
      {!job && (
        <Button color="purple" onClick={handleAddNewJob} className="mt-4">
          <HiPlus className="mr-2 h-5 w-5" />
          Add Job
        </Button>
      )}
    </Card>
  );
};

export default Job;
