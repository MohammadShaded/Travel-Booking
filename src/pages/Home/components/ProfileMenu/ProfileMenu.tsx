import UserButton from './UserButton';
import CurrencySelector from './CurrencySelector';
import HelpButton from './HelpButton';
import styles from './ProfileMenu.module.css';

export default function ProfileMenu() {
  return (
    <div className={styles.profileMenu}>
      <CurrencySelector />
      <HelpButton />
      <UserButton />
    </div>
  );
}
