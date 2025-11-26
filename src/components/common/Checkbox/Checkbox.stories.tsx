import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Wrapper component for interactive stories
const CheckboxWithState = (args: { label: string; disabled?: boolean }) => {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: () => <CheckboxWithState label="Accept terms and conditions" />,
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
    onChange: () => {},
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Remember me',
    checked: false,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true,
    onChange: () => {},
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled but checked',
    checked: true,
    disabled: true,
    onChange: () => {},
  },
};

export const LongLabel: Story = {
  render: () => (
    <CheckboxWithState label="I agree to the terms and conditions, privacy policy, and cookie policy" />
  ),
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const MultipleCheckboxesExample = () => {
      const [amenities, setAmenities] = useState<Record<string, boolean>>({
        wifi: false,
        parking: false,
        pool: false,
        gym: false,
      });

      const handleChange = (key: string) => (checked: boolean) => {
        setAmenities(prev => ({ ...prev, [key]: checked }));
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Checkbox label="Free WiFi" checked={amenities.wifi} onChange={handleChange('wifi')} />
          <Checkbox label="Parking" checked={amenities.parking} onChange={handleChange('parking')} />
          <Checkbox label="Swimming Pool" checked={amenities.pool} onChange={handleChange('pool')} />
          <Checkbox label="Fitness Center" checked={amenities.gym} onChange={handleChange('gym')} />
        </div>
      );
    };

    return <MultipleCheckboxesExample />;
  },
};
