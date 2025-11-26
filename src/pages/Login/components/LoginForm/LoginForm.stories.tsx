import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import type { LoginCredentials } from '@/types';


const meta = {
  title: 'Pages/LoginPage/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        component: 'Login form with validation, loading states, and animated input fields.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Loading state - disables form inputs and shows loading indicator on button',
      defaultValue: false,
    },
    onSubmit: {
      description: 'Async callback function called when form is submitted with valid credentials',
      action: 'submitted',
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock submit handler
const mockSubmit = async (values: LoginCredentials) => {
  console.log('Form submitted with values:', values);
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

/**
 * Default login form in idle state.
 * Form is empty and ready for user input.
 */
export const Default: Story = {
  args: {
    onSubmit: mockSubmit,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial state of the login form with empty fields and no validation errors.',
      },
    },
  },
};

/**
 * Loading state - form is disabled while submitting.
 * Shows button loading indicator and disabled inputs.
 */
export const Loading: Story = {
  args: {
    onSubmit: mockSubmit,
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in loading state during API call. All inputs are disabled and button shows loading indicator.',
      },
    },
  },
};

/**
 * Form with filled values ready for submission.
 * Demonstrates the form with valid input data.
 */
export const WithValues: Story = {
  args: {
    onSubmit: mockSubmit,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form populated with sample values. Try clicking submit to see the loading state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const usernameInput = canvas.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = canvas.querySelector('input[name="password"]') as HTMLInputElement;
    
    if (usernameInput && passwordInput) {
      usernameInput.value = 'john_doe';
      passwordInput.value = 'password123';
      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

/**
 * Interactive form - test validation by typing and submitting.
 * Shows real-time validation feedback.
 */
export const Interactive: Story = {
  args: {
    onSubmit: async (values: LoginCredentials) => {
      console.log('Submitted:', values);
      alert(`Login attempt with:\nUsername: ${values.username}\nPassword: ${values.password}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive form. Try different inputs to test validation rules. Submit to see the loading state.',
      },
    },
  },
};

/**
 * Form with validation errors.
 * Shows error states when validation fails.
 */
export const WithErrors: Story = {
  args: {
    onSubmit: mockSubmit,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form showing validation errors. Username too short and password too short.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const usernameInput = canvas.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = canvas.querySelector('input[name="password"]') as HTMLInputElement;
    const submitButton = canvas.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    if (usernameInput && passwordInput && submitButton) {
      usernameInput.value = 'ab';
      passwordInput.value = '123';
      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      usernameInput.dispatchEvent(new Event('blur', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  },
};

