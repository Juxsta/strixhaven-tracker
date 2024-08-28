import React from 'react';
import { Extracurricular } from '../types';
import useStore from '../store/useStore';
import { Table, Button, Checkbox, Select, Badge, Card } from 'flowbite-react';
import { EXTRA_CURRICULARS } from '../const/extracurriculars';
import { HiPlus } from 'react-icons/hi';
const Extracurriculars: React.FC = () => {
  const { studentActivities, addExtracurricular, updateExtracurricular, deleteExtracurricular } = useStore(
    (state) => state
  );
  const extracurriculars = studentActivities.extracurriculars;

  const handleInputChange = (index: number, field: keyof Extracurricular, value: any) => {
    const updatedExtracurriculars = [...extracurriculars];
    const newExtracurricular = { ...updatedExtracurriculars[index], [field]: value };

    // Update skills array when the extracurricular name changes
    if (field === 'name') {
      const selectedExtracurricular = EXTRA_CURRICULARS.find(ec => ec.name === value);
      newExtracurricular.skills = selectedExtracurricular ? selectedExtracurricular.skills : [];
    }

    updatedExtracurriculars[index] = newExtracurricular;
    updateExtracurricular(index, updatedExtracurriculars[index]);
  };

  const handleAddNewExtracurricular = () => {
    const newExtracurricular = { name: '', d4Used: false, skills: [], member: '' };
    addExtracurricular(newExtracurricular);
  };

  const handleDelete = (index: number) => {
    deleteExtracurricular(index);
  };

  return (
    <Card className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Extracurriculars</h2>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>D4 Used</Table.HeadCell>
          <Table.HeadCell>Skills</Table.HeadCell>
          <Table.HeadCell>Member</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {extracurriculars.map((extracurricular, index) => (
            <Table.Row key={index}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {extracurricular.name && (
                    <a
                      href={`https://dndbeyond.com/sources/dnd/sacoc/school-is-in-session#${extracurricular.name.replace(/[\s""]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 text-red-500 hover:text-red-700"
                    >
                      &amp;
                    </a>
                  )}
                  <Select
                    id={`extracurricular-select-${index}`}
                    value={extracurricular.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="flex-grow"
                  >
                    <option value="">Select an Extracurricular</option>
                    {EXTRA_CURRICULARS.map((extracurricular) => (
                      <option key={extracurricular.name} value={extracurricular.name}>
                        {extracurricular.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  checked={extracurricular.d4Used}
                  onChange={(e) => handleInputChange(index, 'd4Used', e.target.checked)}
                />
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-2">
                  {extracurricular.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} color="purple">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {extracurricular.member && (
                    <a
                      href={`https://dndbeyond.com/sources/dnd/sacoc/relationships#${extracurricular.member.replace(
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
                    id={`member-select-${index}`}
                    value={extracurricular.member}
                    onChange={(e) => handleInputChange(index, 'member', e.target.value)}
                    className="flex-grow"
                  >
                    <option value="">Select a Member</option>
                    {EXTRA_CURRICULARS.find((ec) => ec.name === extracurricular.name)?.members.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </Select>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-end">
                  {index > 0 && (
                    <Button color="failure" size="sm" onClick={() => handleDelete(index)}>
                      🗑️
                    </Button>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {extracurriculars.length < 2 && (
        <Button color="purple" onClick={handleAddNewExtracurricular} className="mt-4">
          <HiPlus className="mr-2 h-5 w-5" />
          Add Extracurricular
        </Button>
      )}
    </Card>
  );
};

export default Extracurriculars;

