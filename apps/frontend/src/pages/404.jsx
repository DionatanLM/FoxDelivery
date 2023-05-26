import React from 'react';
import styles from './PageError.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <span className={styles.numberError}>404</span>
        <span className={styles.title}>PÁGINA NÃO ENCONTRADA</span>
        <span className={styles.description}>
          A página que você tentou acessar não existe mais, foi
          <br /> removida e está temporariamente indisponível.
        </span>

        <a
          href="/"
          style={{
            color: 'white',
          }}
        >
          <div className={styles.button}>VOLTAR PARA HOME</div>
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
