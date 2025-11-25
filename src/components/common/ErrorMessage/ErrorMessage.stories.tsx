import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

const meta = {
  title: 'Common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message text to display',
    },
    onClose: {
      description: 'Optional callback when close button is clicked',
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    message: 'An error occurred. Please try again.',
  },
};

export const WithCloseButton: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    onClose: () => alert('Close button clicked'),
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'Unable to process your request at this time. The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact support if the problem persists.',
  },
};

export const ShortMessage: Story = {
  args: {
    message: 'Invalid input',
  },
};

// Common error scenarios
export const NetworkError: Story = {
  args: {
    message: 'Network error. Please check your internet connection and try again.',
    onClose: () => console.log('Error dismissed'),
  },
};

export const ValidationError: Story = {
  args: {
    message: 'Please fill in all required fields before submitting.',
  },
};

export const AuthenticationError: Story = {
  args: {
    message: 'Invalid email or password. Please try again.',
  },
};

export const ServerError: Story = {
  args: {
    message: 'Server error (500). Our team has been notified and is working on a fix.',
    onClose: () => console.log('Error dismissed'),
  },
};

export const NotFoundError: Story = {
  args: {
    message: 'The requested resource was not found (404).',
  },
};

export const PermissionError: Story = {
  args: {
    message: 'You do not have permission to access this resource.',
  },
};

// Interactive dismissible error
const DismissibleErrorComponent = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          padding: '0.5rem 1rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Show Error Again
      </button>
    );
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <ErrorMessage message="This error can be dismissed by clicking the X button" />
      <button
        onClick={() => setVisible(false)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Dismiss Error
      </button>
    </div>
  );
};

export const DismissibleError: Story = {
  args: { message: '' },
  render: () => <DismissibleErrorComponent />,
};

// Multiple errors example
export const MultipleErrors: Story = {
  args: { message: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <ErrorMessage message="Invalid email address format" />
      <ErrorMessage message="Password must be at least 8 characters" />
      <ErrorMessage message="Phone number is required" />
    </div>
  ),
};

// Form with error example
const FormWithErrorComponent = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
    } else {
      setError('');
      alert('Form submitted successfully!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          Email Address
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        />
        {error && (
          <div style={{ marginTop: '0.5rem' }}>
            <ErrorMessage message={error} />
          </div>
        )}
      </div>
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export const FormWithError: Story = {
  args: { message: '' },
  render: () => <FormWithErrorComponent />,
};

// API error responses
export const APIErrors: Story = {
  args: { message: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>400 Bad Request</h3>
        <ErrorMessage message="The request could not be understood by the server due to malformed syntax." />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>401 Unauthorized</h3>
        <ErrorMessage message="Authentication credentials were missing or incorrect." />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>403 Forbidden</h3>
        <ErrorMessage message="You don't have permission to access this resource." />
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>500 Internal Server Error</h3>
        <ErrorMessage
          message="The server encountered an unexpected condition. Please try again later."
          onClose={() => console.log('Error dismissed')}
        />
      </div>
    </div>
  ),
};
