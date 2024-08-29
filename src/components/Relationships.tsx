import React from 'react';
import useStore from '../store/useStore';
import { CHARACTERS } from '../const/characters';
import { Relationship } from '../types';
import { Table, Button, Checkbox, Select, TextInput, Badge, Card, Label } from 'flowbite-react';
import DNDBeyondLink from './DNDBeyondLink';
import MobileNumberInput from './MobileNumberInput'; // Import the new component
import { HiTrash } from 'react-icons/hi';
import useDeepCompareEffect from 'use-deep-compare-effect';

const Relationships: React.FC = () => {
  const { relationships, addRelationship, updateRelationship, deleteRelationship } = useStore();
  const showInspirationColumn = relationships.some(relationship => relationship.points >= 3);
  const showBoonBaneColumn = relationships.some(relationship => relationship.relationship === 'Rival' || relationship.relationship === 'Friend' || relationship.relationship === 'Beloved');
  const showRelationshipColumn = relationships.some(relationship => relationship.relationship);
  // useEffect to handle changes in relationships array
  useDeepCompareEffect(() => {
    relationships.forEach((relationship, index) => {
      const character = CHARACTERS.find(c => c.name === relationship.name);
      const updatedRelationship = { ...relationship, boonBane: '' };

      if (relationship.points <= -2) {
        updatedRelationship.relationship = 'Rival';
        updatedRelationship.boonBane = character ? character.bane : '';
      } else if (relationship.points === 2) {
        updatedRelationship.relationship = 'Friend';
        updatedRelationship.boonBane = character ? character.boon : '';
      } else if (relationship.points >= 3) {
        updatedRelationship.relationship = 'Beloved';
        updatedRelationship.boonBane = character ? character.boon : '';
      } else {
        updatedRelationship.relationship = '';
        updatedRelationship.boonBane = '';
      }

      updateRelationship(index, updatedRelationship);
    });
  }, [relationships]); // Now using deep comparison on relationships

  const handleInputChange = <K extends keyof Relationship>(index: number, field: K, value: Relationship[K]) => {
    const updatedRelationship = { ...relationships[index], [field]: value };
    updateRelationship(index, updatedRelationship);
  };

  const handleAddNewRelationship = () => {
    const newRelationship = { name: '', points: 0, relationship: '', inspiration: false, boonBane: '' };
    addRelationship(newRelationship);
  };

  const handleDelete = (index: number) => {
    deleteRelationship(index);
  };

  const renderMobileView = () => (
    <div className="space-y-4">
      {relationships.map((relationship, index) => (
        <Card key={index}>
          <div className="space-y-4">
            <div>
              <Label className="block mb-2 font-bold">Name</Label>
              <div className="flex items-center space-x-2">
                {relationship.name && (
                  <DNDBeyondLink
                    text={relationship.name}
                    baseUrl="https://dndbeyond.com/sources/dnd/sacoc/"
                    section="relationships#"
                  />
                )}
                <Select
                  id={`character-select-${index}`}
                  value={relationship.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="w-full"
                >
                  <option value="">Select a Character</option>
                  {CHARACTERS.map((character) => (
                    <option key={character.name} value={character.name}>
                      {character.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label className="block mb-2 font-bold">Points</Label>
              <MobileNumberInput
                value={relationship.points}
                onIncrement={() => handleInputChange(index, 'points', relationship.points + 1)}
                onDecrement={() => handleInputChange(index, 'points', relationship.points - 1)}
                onChange={(value) => handleInputChange(index, 'points', value)}
              />
            </div>
            {relationship.relationship && (
              <div>
                <Label className="block mb-2 font-bold">Relationship</Label>
                <Badge color={relationship.relationship === 'Rival' ? 'failure' :
                  relationship.relationship === 'Friend' ? 'success' :
                    relationship.relationship === 'Beloved' ? 'indigo' : 'default'}>
                  {relationship.relationship}
                </Badge>
              </div>
            )}
            {showInspirationColumn && relationship.relationship === 'Beloved' && (
              <div>
                <Label className="block mb-2 font-bold">Inspiration</Label>
                <Checkbox
                  checked={relationship.inspiration}
                  onChange={(e) => handleInputChange(index, 'inspiration', e.target.checked)}
                />
              </div>
            )}
            {relationship.boonBane && (
              <div>
                <Label className="block mb-2 font-bold">Boon/Bane</Label>
                <Badge
                  color={relationship.relationship === 'Rival' ? 'warning' :
                    relationship.relationship === 'Friend' ? 'success' :
                      relationship.relationship === 'Beloved' ? 'success' : 'default'}
                >
                  {relationship.boonBane}
                </Badge>
              </div>
            )}
            {index > 0 && (
              <Button color="failure" className="w-full" onClick={() => handleDelete(index)}>
                <HiTrash className="h-5 w-5" />
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderDesktopView = () => (
    <Table>
      <Table.Head>
        <Table.HeadCell className="min-w-60">Name</Table.HeadCell>
        <Table.HeadCell className="w-22">Points</Table.HeadCell>
        {showRelationshipColumn && <Table.HeadCell className="min-w-20">Relationship</Table.HeadCell>}
        {showInspirationColumn && <Table.HeadCell className="min-w-5">Inspiration</Table.HeadCell>}
        {showBoonBaneColumn && <Table.HeadCell className="min-w-20">Boon/Bane</Table.HeadCell>}
        <Table.HeadCell></Table.HeadCell> {/* Added a new column for actions */}
      </Table.Head>
      <Table.Body className="divide-y">
        {relationships.map((relationship, index) => (
          <Table.Row key={index} className={`${relationship.relationship === 'Rival' ? 'bg-red-100' : relationship.relationship === 'Friend' ? 'bg-green-100' : relationship.relationship === 'Beloved' ? 'bg-blue-100' : ''}`}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">
                {relationship.name && (
                  <DNDBeyondLink
                    text={relationship.name}
                    baseUrl="https://dndbeyond.com/sources/dnd/sacoc/"
                    section="relationships#"
                  />
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
            {showRelationshipColumn && (
              <Table.Cell>
                <Badge className="inline-block" color={relationship.relationship === 'Rival' ? 'failure' :
                  relationship.relationship === 'Friend' ? 'success' :
                    relationship.relationship === 'Beloved' ? 'indigo' : 'default'}>
                  {relationship.relationship}
                </Badge>
              </Table.Cell>
            )}
            {showInspirationColumn && relationship.relationship === 'Beloved' && (
              <Table.Cell className="text-center">
                <Checkbox
                  checked={relationship.inspiration}
                  onChange={(e) => handleInputChange(index, 'inspiration', e.target.checked)}
                />
              </Table.Cell>
            )}
            {showBoonBaneColumn && (
              <Table.Cell>
                <Badge
                  color={relationship.relationship === 'Rival' ? 'warning' :
                    relationship.relationship === 'Friend' ? 'success' :
                      relationship.relationship === 'Beloved' ? 'success' : 'default'}
                >
                  {relationship.boonBane}
                </Badge>
              </Table.Cell>
            )}
            <Table.Cell>
              {index > 0 && ( // Condition to not show the delete button for the first row
                <Button color="failure" size="sm" onClick={() => handleDelete(index)}>
                  <HiTrash className="h-5 w-5" />
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Relationships</h2>
      <div className="hidden md:block">
        {renderDesktopView()}
      </div>
      <div className="md:hidden">
        {renderMobileView()}
      </div>
      <Button color="purple" onClick={handleAddNewRelationship} className="mt-4">
        Add Relationship +
      </Button>
    </Card>
  );
};

export default Relationships;