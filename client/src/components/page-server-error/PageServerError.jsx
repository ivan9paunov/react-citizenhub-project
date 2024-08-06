import styles from './PageServerError.module.css';

export default function PageServerError() {
    return (
        <div id={styles.container}>
            <img
                src='/img/server-error.png'
                alt='Server Error'
                id={styles.image}
            />
        </div>
    );
};