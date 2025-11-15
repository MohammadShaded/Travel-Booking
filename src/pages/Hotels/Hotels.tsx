import styles from './Hotels.module.css';

export default function Hotels() {
  return (
    <div className={styles.hotelsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hotels</h1>
        <p className={styles.description}>
          This page demonstrates the navigation header. Notice the header stays fixed at the top as you scroll.
        </p>
        
        <div className={styles.content}>
          <div className={styles.placeholder}>
            <h2>Hotel Search Results</h2>
            <p>Content will be added here...</p>
          </div>
          
          {/* Add some height to demonstrate scroll behavior */}
          <div className={styles.filler}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={styles.card}>
                <h3>Hotel Card {i + 1}</h3>
                <p>Sample content to demonstrate scrolling behavior</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
