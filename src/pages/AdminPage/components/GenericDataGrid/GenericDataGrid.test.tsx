import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenericDataGrid from './GenericDataGrid';
import type { DataGridConfig } from '@/types';

interface MockItem {
  id: number;
  name: string;
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const mockItems: MockItem[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

const mockConfig: DataGridConfig<MockItem> = {
  entityName: 'Item',
  entityNamePlural: 'Items',
  queryKey: 'test-items',
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'actions', label: 'Actions' },
  ],
  fetchFn: vi.fn(async () => mockItems),
  deleteFn: vi.fn(async () => {}),
  getItemId: (item) => item.id,
};

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('GenericDataGrid', () => {
  it('renders loading state initially', () => {
    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    expect(screen.getByText(/loading items/i)).toBeInTheDocument();
  });

  it('renders data after loading', async () => {
    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  it('displays entity name in title', async () => {
    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Items Management')).toBeInTheDocument();
    });
  });

  it('calls onCreate when create button is clicked', async () => {
    const onCreate = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={onCreate}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Items Management')).toBeInTheDocument();
    });

    const createButton = screen.getByRole('button', { name: /create item/i });
    await user.click(createButton);

    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it('calls onEdit when row is clicked', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={onEdit}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    const row = screen.getByText('Item 1').closest('tr');
    if (row) await user.click(row);

    expect(onEdit).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={onEdit}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByLabelText(/edit/i);
    await user.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(mockItems[0]);
  });

  it('shows delete confirmation on first click', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericDataGrid
        config={mockConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    expect(screen.getByText('Confirm?')).toBeInTheDocument();
  });

  it('calls deleteFn on second click (confirmation)', async () => {
    const deleteFn = vi.fn(async () => {});
    const user = userEvent.setup();

    renderWithQueryClient(
      <GenericDataGrid
        config={{ ...mockConfig, deleteFn }}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    // First click - should show confirmation
    const deleteButtons = screen.getAllByLabelText(`Delete ${mockConfig.entityName}`);
    await user.click(deleteButtons[0]);
    
    // After first click, the button should change to confirmation state
    await waitFor(() => {
      expect(screen.getByLabelText(`Confirm delete ${mockConfig.entityName}`)).toBeInTheDocument();
    });
    
    // Second click on the same button (now in confirm state) - should call deleteFn
    const confirmButton = screen.getByLabelText(`Confirm delete ${mockConfig.entityName}`);
    await user.click(confirmButton);

    await waitFor(() => {
      expect(deleteFn).toHaveBeenCalledTimes(1);
    });
    
    // Verify it was called with the correct ID (first argument)
    expect(deleteFn).toHaveBeenNthCalledWith(1, 1, expect.anything());
  });

  it('displays empty state when no data', async () => {
    const emptyConfig = {
      ...mockConfig,
      fetchFn: vi.fn(async () => []),
    };

    renderWithQueryClient(
      <GenericDataGrid
        config={emptyConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/no items found/i)).toBeInTheDocument();
    });
  });

  it('renders custom column content', async () => {
    const customConfig: DataGridConfig<MockItem> = {
      ...mockConfig,
      columns: [
        { key: 'id', label: 'ID' },
        {
          key: 'name',
          label: 'Name',
          render: (item) => `Custom: ${item.name}`,
        },
        { key: 'actions', label: 'Actions' },
      ],
    };

    renderWithQueryClient(
      <GenericDataGrid
        config={customConfig}
        searchQuery=""
        onEdit={vi.fn()}
        onCreate={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Custom: Item 1')).toBeInTheDocument();
    });
  });
});
