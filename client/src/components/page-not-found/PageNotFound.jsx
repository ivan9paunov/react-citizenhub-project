import styles from './PageNotFound.module.css';

export default function PageNotFound() {
    return (
        <div id={styles.container}>
            <img
                src='/img/404.png'
                alt='Page Not Found'
                id={styles.image}
            />
        </div>
    );
};