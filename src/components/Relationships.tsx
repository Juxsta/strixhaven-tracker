import React from 'react';
import useStore from '../store/useStore';
import { CHARACTERS } from '../const/characters';
import { Relationship } from '../types';
import { Table, Button, Checkbox, Select, TextInput, Badge, Card } from 'flowbite-react';

const Relationships: React.FC = () => {
  const { relationships, addRelationship, updateRelationship, deleteRelationship } = useStore();

  const showInspirationColumn = relationships.some(relationship => relationship.points >= 3);

  const handleInputChange = <K extends keyof Relationship>(index: number, field: K, value: Relationship[K]) => {
    const updatedRelationship = { ...relationships[index], [field]: value };

    if (field === 'points') {
      const numericValue = Number(value);
      const character = CHARACTERS.find((c) => c.name === updatedRelationship.name);

      updatedRelationship.relationship = '';
      updatedRelationship.boonBane = '';

      if (numericValue <= -2) {
        updatedRelationship.relationship = 'Rival';
        updatedRelationship.boonBane = character ? character.bane : '';
      } else if (numericValue === 2) {
        updatedRelationship.relationship = 'Friend';
        updatedRelationship.boonBane = character ? character.boon : '';
      } else if (numericValue >= 3) {
        updatedRelationship.relationship = 'Beloved';
        updatedRelationship.boonBane = character ? character.boon : '';
      }
    }

    updateRelationship(index, updatedRelationship);
  };

  const handleAddNewRelationship = () => {
    const newRelationship = { name: '', points: 0, relationship: '', inspiration: false, boonBane: '' };
    addRelationship(newRelationship);
  };

  const handleDelete = (index: number) => {
    deleteRelationship(index);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Relationships</h2>
      <Table>
        <Table.Head>
          <Table.HeadCell className="min-w-60">Name</Table.HeadCell>
          <Table.HeadCell className="w-22">Points</Table.HeadCell>
          <Table.HeadCell className="min-w-20">Relationship</Table.HeadCell>
          {showInspirationColumn && <Table.HeadCell className="min-w-5">Inspiration</Table.HeadCell>}
          <Table.HeadCell className="min-w-20">Boon/Bane</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y ">
          {relationships.map((relationship, index) => (
            <Table.Row key={index} className={`${relationship.relationship === 'Rival' ? 'bg-red-100' : relationship.relationship === 'Friend' ? 'bg-green-100' : relationship.relationship === 'Beloved' ? 'bg-blue-100' : ''}`}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                  {relationship.name && (
                    <a
                      href={`https://dndbeyond.com/sources/dnd/sacoc/relationships#${relationship.name.replace(/[\s""]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 text-red-500 hover:text-red-700"
                    >
                      &amp;
                    </a>
                  )}
                  <Select
                    id={`character-select-${index}`}
                    value={relationship.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="flex-grow"
                  >
                    <option value="">Select a Character</option>
                    {CHARACTERS.map((character) => (
                      <option key={character.name} value={character.name}>
                        {character.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </Table.Cell>
              <Table.Cell>
                <TextInput
                  type="number"
                  className="w-full text-center bg-transparent"
                  value={relationship.points}
                  onChange={(e) => handleInputChange(index, 'points', Number(e.target.value))}
                />
              </Table.Cell>
              <Table.Cell>
                <Badge className="inline-block" color={relationship.relationship === 'Rival' ? 'failure' :
                  relationship.relationship === 'Friend' ? 'success' :
                    relationship.relationship === 'Beloved' ? 'indigo' : 'default'}>
                  {relationship.relationship}
                </Badge>
              </Table.Cell>
              {showInspirationColumn && (
                <Table.Cell className="text-center">
                  {relationship.relationship === 'Beloved' && (
                    <Checkbox
                      checked={relationship.inspiration}
                      onChange={(e) => handleInputChange(index, 'inspiration', e.target.checked)}
                    />
                  )}
                </Table.Cell>
              )}
              <Table.Cell>
                <div className="flex justify-between items-center">
                  <Badge
                    color={relationship.relationship === 'Rival' ? 'warning' :
                      relationship.relationship === 'Friend' ? 'success' :
                        relationship.relationship === 'Beloved' ? 'success' : 'default'}
                  >
                    {relationship.boonBane}
                  </Badge>
                  {index > 0 && (
                    <Button color="failure" size="sm" className="ml-6" onClick={() => handleDelete(index)}>
                      🗑️
                    </Button>
                  )}
                </div>
              </Table.Cell>

            </Table.Row>
          ))}
        </Table.Body>

      </Table>
      <Button color="purple" onClick={handleAddNewRelationship} className="mt-4">
        Add Relationship +
      </Button>
    </Card>
  );
};

export default Relationships;