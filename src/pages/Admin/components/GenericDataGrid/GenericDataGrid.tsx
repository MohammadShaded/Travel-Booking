import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import type { DataGridConfig } from '@/types';
import Button from '@/components/common/Button';
import styles from './GenericDataGrid.module.css';

interface GenericDataGridProps<T> {
  config: DataGridConfig<T>;
  searchQuery?: string;
  onEdit: (item: T) => void;
  onCreate: () => void;
}

function GenericDataGrid<T>({
  config,
  searchQuery = '',
  onEdit,
  onCreate,
}: GenericDataGridProps<T>) {
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: [config.queryKey, searchQuery],
    queryFn: () => config.fetchFn(searchQuery || undefined),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: config.deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      setDeleteConfirm(null);
    },
  });

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      deleteMutation.mutate(id);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading {config.entityNamePlural.toLowerCase()}...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load {config.entityNamePlural.toLowerCase()}. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{config.entityNamePlural} Management</h1>
        <Button onClick={onCreate} variant="primary">
          <FaPlus className={styles.buttonIcon} />
          Create {config.entityName}
        </Button>
      </div>

      {data && data.length > 0 ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {config.columns.map((col) => (
                  <th key={String(col.key)}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const itemId = config.getItemId(item);
                return (
                  <tr key={itemId} onClick={() => onEdit(item)} className={styles.row}>
                    {config.columns.map((col) => {
                      if (col.key === 'actions') {
                        return (
                          <td key="actions" className={styles.actions}>
                            <button
                              className={styles.editButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                              }}
                              aria-label={`Edit ${config.entityName}`}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className={`${styles.deleteButton} ${
                                deleteConfirm === itemId ? styles.confirm : ''
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(itemId);
                              }}
                              aria-label={
                                deleteConfirm === itemId
                                  ? `Confirm delete ${config.entityName}`
                                  : `Delete ${config.entityName}`
                              }
                              disabled={deleteMutation.isPending}
                            >
                              <FaTrash />
                              {deleteConfirm === itemId && (
                                <span className={styles.confirmText}>Confirm?</span>
                              )}
                            </button>
                          </td>
                        );
                      }

                      return (
                        <td key={String(col.key)} className={col.className}>
                          {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No {config.entityNamePlural.toLowerCase()} found.</p>
          <Button onClick={onCreate} variant="primary">
            Create First {config.entityName}
          </Button>
        </div>
      )}
    </div>
  );
}

export default GenericDataGrid;
