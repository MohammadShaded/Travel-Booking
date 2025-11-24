import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenericDataGrid from './GenericDataGrid';
import type { DataGridConfig } from '@/types';

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

const mockCities: MockCity[] = [
  { id: 1, name: 'New York', description: 'The Big Apple' },
  { id: 2, name: 'London', description: 'Capital of England' },
  { id: 3, name: 'Tokyo', description: 'Capital of Japan' },
];

const mockConfig: DataGridConfig<MockCity> = {
  entityName: 'City',
  entityNamePlural: 'Cities',
  queryKey: 'mock-cities',
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'actions', label: 'Actions' },
  ],
  fetchFn: async () => mockCities,
  deleteFn: async () => {},
  getItemId: (city: MockCity) => city.id,
};

const meta: Meta<typeof GenericDataGrid> = {
  title: 'Admin/GenericDataGrid',
  component: GenericDataGrid,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
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

export const Default: Story = {
  args: {
    config: mockConfig as unknown as DataGridConfig<unknown>,
    searchQuery: '',
    onEdit: ((city: MockCity) => console.log('Edit:', city)) as (item: unknown) => void,
    onCreate: () => console.log('Create new'),
  },
};

export const WithSearchQuery: Story = {
  args: {
    config: mockConfig as unknown as DataGridConfig<unknown>,
    searchQuery: 'Tokyo',
    onEdit: ((city: MockCity) => console.log('Edit:', city)) as (item: unknown) => void,
    onCreate: () => console.log('Create new'),
  },
};

export const EmptyState: Story = {
  args: {
    config: {
      ...mockConfig,
      fetchFn: async () => [],
    } as unknown as DataGridConfig<unknown>,
    searchQuery: '',
    onEdit: ((city: MockCity) => console.log('Edit:', city)) as (item: unknown) => void,
    onCreate: () => console.log('Create new'),
  },
};

