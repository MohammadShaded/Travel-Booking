import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';

const meta = {
  title: 'Common/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    touched: {
      control: 'boolean',
      description: 'Whether the field has been touched (for error display)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark the field as required',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    type: 'text',
    placeholder: 'Enter username',
    name: 'username',
    value: 'john_doe',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    name: 'fullName',
    required: true,
  },
};

// Error states
export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    error: 'Invalid email address',
    touched: true,
    value: 'invalid-email',
  },
};

export const ErrorNotTouched: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    error: 'Invalid email address',
    touched: false,
    value: 'invalid-email',
  },
};

export const LongErrorMessage: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    name: 'password',
    error:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
    touched: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    disabled: true,
    value: 'disabled@example.com',
  },
};

// Different input types
export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
    name: 'age',
    min: 18,
    max: 100,
  },
};

export const TelephoneInput: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    name: 'phone',
  },
};

export const URLInput: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
    name: 'website',
  },
};

// Interactive example with controlled state
const ControlledInputComponent = () => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const error = touched && value.length < 3 ? 'Must be at least 3 characters' : '';

  return (
    <Input
      label="Username"
      type="text"
      placeholder="Enter username"
      name="username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setTouched(true)}
      error={error}
      touched={touched}
    />
  );
};

export const ControlledInput: Story = {
  render: () => <ControlledInputComponent />,
};

// Form example
export const FormExample: Story = {
  render: () => (
    <form style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input label="Email" type="email" placeholder="john@example.com" name="email" required />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        name="confirmPassword"
        required
      />
      <Input label="Phone (Optional)" type="tel" placeholder="+1 (555) 000-0000" name="phone" />
    </form>
  ),
};

// Validation states
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <Input label="Valid Input" type="text" name="valid" value="John Doe" touched={true} />
      <Input
        label="Invalid Email"
        type="email"
        name="invalidEmail"
        value="not-an-email"
        error="Please enter a valid email address"
        touched={true}
      />
      <Input
        label="Required Field"
        type="text"
        name="required"
        value=""
        error="This field is required"
        touched={true}
        required
      />
    </div>
  ),
};
