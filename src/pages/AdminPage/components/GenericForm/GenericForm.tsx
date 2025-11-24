import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import type { FormConfig } from '@/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import styles from './GenericForm.module.css';

interface GenericFormProps<T, CreateReq, UpdateReq> {
  config: FormConfig<T, CreateReq, UpdateReq>;
  isOpen: boolean;
  onClose: () => void;
  item?: T | null;
}

function GenericForm<T, CreateReq, UpdateReq>({
  config,
  isOpen,
  onClose,
  item,
}: GenericFormProps<T, CreateReq, UpdateReq>) {
  const queryClient = useQueryClient();

  // Initialize Formik
  const formik = useFormik({
    initialValues: item ? config.mapFromItem(item) : ({} as Partial<T>),
    validationSchema: config.validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (item) {
        const id = config.getItemId(item);
        const updateData = config.mapToUpdateRequest(values);
        updateMutation.mutate({ id, data: updateData });
      } else {
        const createData = config.mapToCreateRequest(values);
        createMutation.mutate(createData);
      }
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: config.createFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      handleClose();
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateReq }) => config.updateFn(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      handleClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form first
    const errors = await formik.validateForm();

    // Mark all fields as touched to show validation errors
    const touched = config.fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {});
    formik.setTouched(touched, true); // Second param 'true' means validate immediately

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      formik.submitForm();
    }
  };

  if (!isOpen) return null;

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {item ? `Edit ${config.entityName}` : `Create New ${config.entityName}`}
          </h2>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close form">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className={styles.form}>
          {config.fields.map((field) => (
            <div key={String(field.name)} className={styles.formGroup}>
              <label htmlFor={`field-${String(field.name)}`} className={styles.label}>
                {field.label}
                {field.required && <span className={styles.required}> *</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={`field-${String(field.name)}`}
                  name={String(field.name)}
                  value={String(formik.values[field.name] ?? '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                  className={`${styles.textarea} ${formik.touched[field.name] && formik.errors[field.name] ? styles.error : ''}`}
                  rows={field.rows || 4}
                />
              ) : field.type === 'select' ? (
                <select
                  id={`field-${String(field.name)}`}
                  name={String(field.name)}
                  value={String(formik.values[field.name] ?? '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.select} ${formik.touched[field.name] && formik.errors[field.name] ? styles.error : ''}`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={`field-${String(field.name)}`}
                  name={String(field.name)}
                  type={field.type}
                  value={String(formik.values[field.name] ?? '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                  error={
                    formik.touched[field.name] ? String(formik.errors[field.name] || '') : undefined
                  }
                  touched={Boolean(formik.touched[field.name])}
                />
              )}

              {formik.touched[field.name] &&
                formik.errors[field.name] &&
                (field.type === 'textarea' || field.type === 'select') && (
                  <span className={styles.errorText}>{String(formik.errors[field.name])}</span>
                )}
            </div>
          ))}

          <div className={styles.footer}>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? 'Saving...' : item ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default GenericForm;
