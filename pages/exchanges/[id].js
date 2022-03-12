import { useRouter } from 'next/router';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useEffect, useState } from 'react';
import { getExchangeById } from '../../apis/coingecko';
import styles from './[id].module.scss';
import classNames from 'classnames';

export default function Exchange() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!data && id) {
      getExchangeById(id).then((x) => {
        setData(x);
        setIsLoading(false);
      });
    }
  }, [id, data, setData, setIsLoading]);
  return isLoading ? (
    <Loader global={true} />
  ) : (
    <div className="px-8 max-w-5xl mx-auto">
      <Button onClick={() => router.push('/')} className="my-16">
        &larr; Home
      </Button>
      <div className="text-green-500">
        #{data.trust_score_rank}
        <div>
          {/* the image provided by the api is pretty low res, I think this page would look better without it */}
          {/* <Image src={data.image} alt={`${data.name} logo`} width={50} height={50} /> */}
          <div className="heading text-7xl mb-6">{data.name}</div>
        </div>
        <Metadata {...data} />
      </div>
      <div className="mb-16">
        <TickerTable {...data} />
      </div>
    </div>
  );
}

function TickerTable({ tickers }) {
  return (
    <>
      <div className="mb-4 text-5xl font-bold text-green-500">
        Latest Quotes
      </div>
      <div className={classNames(styles.th, styles.tr)}>
        <div>Ticker</div>
        <div>Latest Price</div>
        <div>Volume</div>
        <div>Spread</div>
      </div>
      {tickers
        ?.filter((ticker) => !ticker.is_stale)
        ?.map((ticker) => (
          <div
            key={`${ticker.base}.${ticker.target}`}
            className={classNames(styles.tr, styles['tr-data'])}
          >
            <div className={styles.ticker}>
              {ticker.base}/{ticker.target}
            </div>
            <div className={styles.last}>{ticker.last}</div>
            <div className={styles.volume}>{ticker.volume?.toFixed(0)}</div>
            <div className={styles.spread}>
              {(ticker.bid_ask_spread_percentage * 100).toFixed(2)}%
            </div>
          </div>
        ))}
    </>
  );
}

function Metadata({ country, year_established, description }) {
  return (
    <dl className={styles['def-list']}>
      {country && (
        <>
          <dt>Location</dt>
          <dd>{country}</dd>
        </>
      )}
      {year_established && (
        <>
          <dt>Established</dt>
          <dd>{year_established}</dd>
        </>
      )}
      {description && (
        <>
          <dt>Description</dt>
          <dd>{description}</dd>
        </>
      )}
    </dl>
  );
}

// could do SSG really easily with functions below
// it's rate-limited with the free plan so no-go for now
// would still need to request updated ticker data client-side

// export async function getStaticPaths() {
//   console.log("getting static paths")
//   const paths = await getExchangeIds();
//   return {
//     paths: paths?.map(x => ({ params: { id: x.id } })),
//     fallback: false
//   };
// }

// export async function getStaticProps({ params }) {
//   const data = await getExchangeData(params.id);
//   return { props: { data } };
// }
