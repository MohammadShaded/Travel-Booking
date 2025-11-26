import UserButton from './UserButton';
import HelpButton from './HelpButton';
import styles from './ProfileMenu.module.css';

export default function ProfileMenu() {
  return (
    <div className={styles.profileMenu}>
      <HelpButton />
      <UserButton />
    </div>
  );
}
