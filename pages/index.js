import Head from 'next/head';
import { useEffect, useState } from 'react';
import ExchangeGrid from '../components/ExchangeGrid';
import Button from '../components/common/Button';
import { getExchangeSummaries } from '../apis/coingecko';

export default function Home() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getExchangeSummaries({ itemsPerPage: 10, page }).then((x) => {
      setData(x);
      setIsLoading(false);
    });
  }, [page, setData]);
  return (
    <>
      <Head>
        <title>Crypto Directory</title>
        <meta
          name="description"
          content="Directory of popular cryptocurrency exchanges"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl mx-auto p-16 mb-16">
        <header className="mb-16 heading text-green-500 text-center text-5xl md:text-7xl">
          Top Crypto Exchanges
        </header>
        <ExchangeGrid isLoading={isLoading} nItems={10} data={data} />

        <div className="mt-8 clear-right">
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>
              &larr; <span className="hidden md:inline">Previous</span>
            </Button>
          )}
          <Button className="float-right" onClick={() => setPage(page + 1)}>
            <span className="hidden md:inline">Next</span> &rarr;
          </Button>
        </div>
      </main>
    </>
  );
}
