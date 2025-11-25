import Logo from '@/components/common/Logo';
import FeatureList from '../FeatureList/FeatureList';
import styles from './BrandSection.module.css';

export default function BrandSection() {
  return (
    <div className={styles.brandSection}>
      <Logo size="large" variant="white" />
      
      <h2 className={styles.brandTagline}>Book Your Perfect Stay, Anywhere</h2>
      <p className={styles.brandDescription}>
        Find and book hotels worldwide with confidence. Trusted by thousands of travelers.
      </p>
      <FeatureList />
    </div>
  );
}
