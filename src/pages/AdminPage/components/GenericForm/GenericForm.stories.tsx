import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as yup from 'yup';
import GenericForm from './GenericForm';
import type { FormConfig } from '@/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

interface MockCity {
  id: number;
  name: string;
  description: string;
}

interface CreateRequest {
  name: string;
  description: string;
}

const mockValidationSchema = yup.object({
  name: yup.string().required('City Name is required'),
  description: yup.string().required('Description is required'),
});

const mockConfig: FormConfig<MockCity, CreateRequest, CreateRequest> = {
  entityName: 'City',
  queryKey: 'mock-cities',
  validationSchema: mockValidationSchema,
  fields: [
    {
      name: 'name',
      label: 'City Name',
      type: 'text',
      required: true,
      placeholder: 'Enter city name',
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
  createFn: async (data) => {
    console.log('Create:', data);
    return { id: 1, ...data };
  },
  updateFn: async (id, data) => {
    console.log('Update:', id, data);
    return { id, ...data };
  },
  getItemId: (city) => city.id,
  mapToCreateRequest: (formData) => ({
    name: (formData.name as string) || '',
    description: (formData.description as string) || '',
  }),
  mapToUpdateRequest: (formData) => ({
    name: (formData.name as string) || '',
    description: (formData.description as string) || '',
  }),
  mapFromItem: (city) => ({
    name: city.name,
    description: city.description,
  }),
};

const meta: Meta<typeof GenericForm> = {
  title: 'Admin/GenericForm',
  component: GenericForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ position: 'relative', height: '100vh' }}>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
  args: {
    config: mockConfig as FormConfig<unknown, unknown, unknown>,
    isOpen: true,
    onClose: () => console.log('Close'),
    item: null,
  },
};

export const EditMode: Story = {
  args: {
    config: mockConfig as FormConfig<unknown, unknown, unknown>,
    isOpen: true,
    onClose: () => console.log('Close'),
    item: {
      id: 1,
      name: 'New York',
      description: 'The Big Apple',
    },
  },
};
