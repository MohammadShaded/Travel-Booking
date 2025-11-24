import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as yup from 'yup';
import GenericForm from './GenericForm';
import type { FormConfig } from '@/types';

interface MockItem {
  id: number;
  name: string;
  description: string;
}

interface CreateRequest {
  name: string;
  description: string;
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// Yup validation schema for tests
const mockValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});

const mockConfig: FormConfig<MockItem, CreateRequest, CreateRequest> = {
  entityName: 'Item',
  queryKey: 'test-items',
  validationSchema: mockValidationSchema,
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter name',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Enter description',
      rows: 4,
    },
  ],
  createFn: vi.fn(async (data) => ({ id: 1, ...data })),
  updateFn: vi.fn(async (id, data) => ({ id, ...data })),
  getItemId: (item) => item.id,
  mapToCreateRequest: (formData) => ({
    name: (formData.name as string) || '',
    description: (formData.description as string) || '',
  }),
  mapToUpdateRequest: (formData) => ({
    name: (formData.name as string) || '',
    description: (formData.description as string) || '',
  }),
  mapFromItem: (item) => ({
    name: item.name,
    description: item.description,
  }),
};

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('GenericForm', () => {
  it('does not render when closed', () => {
    const { container } = renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={false}
        onClose={vi.fn()}
        item={null}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders create mode with correct title', () => {
    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={null}
      />
    );

    expect(screen.getByText('Create New Item')).toBeInTheDocument();
  });

  it('renders edit mode with correct title', () => {
    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={{ id: 1, name: 'Test', description: 'Test desc' }}
      />
    );

    expect(screen.getByText('Edit Item')).toBeInTheDocument();
  });

  it('populates form fields in edit mode', () => {
    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={{ id: 1, name: 'Test Item', description: 'Test Description' }}
      />
    );

    expect(screen.getByDisplayValue('Test Item')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={null}
      />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('shows required indicator for required fields', () => {
    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={null}
      />
    );

    const requiredMarkers = screen.getAllByText('*');
    expect(requiredMarkers.length).toBeGreaterThan(0);
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={onClose}
        item={null}
      />
    );

    const closeButton = screen.getByLabelText(/close form/i);
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={onClose}
        item={null}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('validates required fields on submit', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericForm
        config={mockConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={null}
      />
    );

    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });
  });

  it('calls createFn with form data in create mode', async () => {
    const createFn = vi.fn(async (data) => ({ id: 1, ...data }));
    const onClose = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericForm
        config={{ ...mockConfig, createFn }}
        isOpen={true}
        onClose={onClose}
        item={null}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    const descInput = screen.getByLabelText(/description/i);

    await user.type(nameInput, 'New Item');
    await user.type(descInput, 'New Description');

    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(createFn).toHaveBeenCalled();
    });
    
    const callArgs = createFn.mock.calls[0][0];
    expect(callArgs.name).toBe('New Item');
    expect(callArgs.description).toBe('New Description');
  });

  it('calls updateFn with form data in edit mode', async () => {
    const updateFn = vi.fn(async (id, data) => ({ id, ...data }));
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericForm
        config={{ ...mockConfig, updateFn }}
        isOpen={true}
        onClose={vi.fn()}
        item={{ id: 1, name: 'Old Name', description: 'Old Desc' }}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Name');

    const submitButton = screen.getByRole('button', { name: /update/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(updateFn).toHaveBeenCalledWith(1, {
        name: 'Updated Name',
        description: 'Old Desc',
      });
    });
  });

  it('disables submit button while saving', async () => {
    const user = userEvent.setup();
    const createFn = vi.fn(
      async () => new Promise<MockItem>((resolve) => setTimeout(() => resolve({ id: 1, name: 'Test', description: 'Test' }), 100))
    ) as unknown as (data: CreateRequest) => Promise<MockItem>;

    renderWithQueryClient(
      <GenericForm
        config={{ ...mockConfig, createFn }}
        isOpen={true}
        onClose={vi.fn()}
        item={null}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    const descInput = screen.getByLabelText(/description/i);

    await user.type(nameInput, 'Test');
    await user.type(descInput, 'Test Desc');

    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
  });

  it('runs custom validation', async () => {
    const user = userEvent.setup();
    
    // Custom Yup schema with length validation
    const customValidationSchema = yup.object({
      name: yup.string().required('Name is required').min(5, 'Name must be at least 5 characters'),
    });
    
    const customConfig: FormConfig<MockItem, CreateRequest, CreateRequest> = {
      ...mockConfig,
      validationSchema: customValidationSchema,
      fields: [
        {
          name: 'name' as keyof MockItem,
          label: 'Name',
          type: 'text' as const,
          required: true,
          placeholder: 'Enter name',
        },
      ],
    };

    renderWithQueryClient(
      <GenericForm
        config={customConfig}
        isOpen={true}
        onClose={vi.fn()}
        item={null}
      />
    );

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'ABC');

    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 5 characters/i)
      ).toBeInTheDocument();
    });
  });
});
