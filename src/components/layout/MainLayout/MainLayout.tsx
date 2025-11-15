import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const location = useLocation();


  const isShowHeader = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <div className={styles.layout}>
      {isShowHeader && <Header />}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
