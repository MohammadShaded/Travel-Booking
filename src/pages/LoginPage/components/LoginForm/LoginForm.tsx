import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { LoginCredentials } from '@/types';
import styles from './LoginForm.module.css';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

export interface LoginFormProps {
  onSubmit: (values: LoginCredentials) => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const formik = useFormik<LoginCredentials>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <Input
        label="Username"
        id="username"
        name="username"
        type="text"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.username}
        touched={formik.touched.username}
        disabled={isLoading}
        placeholder="Enter your username"
      />

      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.password}
        touched={formik.touched.password}
        disabled={isLoading}
        placeholder="Enter your password"
      />

      <Button type="submit" isLoading={isLoading} fullWidth variant="primary">
        Sign In
      </Button>
    </form>
  );
}
