import React from 'react';
import { Button, TextInput } from 'flowbite-react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface MobileNumberInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
  className?: string;
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({ value, onIncrement, onDecrement, onChange, className }) => {
  return (
    <div className={className}>
      <Button
        color="indigo"
        className="w-full rounded-bl-none rounded-br-none"
        onClick={onIncrement}

      >
        <FaPlus />

      </Button>
      <TextInput
        type="number"
        className="w-full !rounded-none"
        style={{ borderRadius: 0, textAlign: 'center', textIndent: '14px' }} // Added textIndent here
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <Button
        color="indigo"
        className="w-full rounded-tl-none rounded-tr-none"
        onClick={onDecrement}
      >
        <FaMinus />

      </Button>
    </div>
  );
};

export default MobileNumberInput;