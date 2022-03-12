import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styles from './ExchangeGrid.module.scss';

function ExchangeGrid({ isLoading, nItems, data }) {
  return (
    <div className={styles.exchange}>
      <div className={styles.th}>
        <div>#</div>
        <div className="">Exchange</div>
        <div>Country</div>
        <div>Link</div>
      </div>
      {(data ?? [...Array(nItems)]).map((exchange, i) => (
        <Exchange key={i} {...exchange} isLoading={isLoading} />
      ))}
    </div>
  );
}

function Exchange({
  id,
  trust_score_rank,
  image,
  name,
  country,
  url,
  isLoading,
}) {
  const router = useRouter();
  const gotoExchange = useCallback(
    (id) => router.push(`/exchanges/${id}`),
    [router]
  );
  const shimmer = { shimmer: isLoading };
  return (
    <article
      onClick={() => gotoExchange(id)}
      className={classNames(styles.tr, styles['tr-data'])}
    >
      <div className={classNames(styles.rank, shimmer)}>{trust_score_rank}</div>
      <div className={styles['name-container']}>
        <div className="flex items-center">
          <div className={classNames('relative w-8 h-8')}>
            {!isLoading && image && (
              <Image
                className="rounded"
                src={image}
                alt={`${name} Logo`}
                layout="fill"
                objectPosition="50% 50%"
              />
            )}
          </div>
        </div>
        <header className={classNames(styles.name, 'w-full', shimmer)}>
          {name}
        </header>
      </div>
      <div className={classNames(styles.country, shimmer)}>
        {country || <>&mdash;</>}
      </div>
      <div className={classNames(styles.url, shimmer)}>
        {isLoading ||
          (url && (
            <a
              className="text-blue-600"
              href={url || ''}
              target="_blank"
              rel="noreferrer"
            >
              Visit website
            </a>
          ))}
      </div>
    </article>
  );
}

export default ExchangeGrid;
