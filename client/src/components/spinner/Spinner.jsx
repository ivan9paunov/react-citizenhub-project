import styles from './Spinner.module.css';

export default function Spinner() {
    return (
        <div className={styles.loadingShade} style={{ paddingBottom: '200px' }}>
            <div className={styles.spinner}></div>
        </div>
    );
}