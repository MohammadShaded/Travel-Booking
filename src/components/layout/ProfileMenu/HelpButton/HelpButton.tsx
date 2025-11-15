import { MdHelpOutline } from 'react-icons/md';
import styles from './HelpButton.module.css';

export default function HelpButton() {
  const handleHelpClick = () => {
  };

  return (
    <button className={styles.helpButton} onClick={handleHelpClick}>
      <MdHelpOutline className={styles.helpIcon} />
      <span className={styles.helpText}>Help</span>
    </button>
  );
}
