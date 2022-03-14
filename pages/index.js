import Head from 'next/head';
import { useEffect, useState } from 'react';
import ExchangeGrid from '../components/ExchangeGrid';
import Button from '../components/common/Button';
import { getExchangeSummaries } from '../apis/coingecko';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { page: pageQuery } = router.query;
  const [page, setPage] = useState(pageQuery ?? 1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getExchangeSummaries({ itemsPerPage: 10, page }).then((x) => {
      setData(x);
      setIsLoading(false);
    });
  }, [page, setData]);
  const gotoPage = (newPage) => {
    setPage(newPage);
    router.push(
      {
        pathname: '/',
        query: {
          page: newPage,
        },
      },
      { pathname: '/' },
      { shallow: false, scroll: false }
    );
  };
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
        <header className="mb-16 heading text-center">
          Top Crypto Exchanges
        </header>
        <ExchangeGrid isLoading={isLoading} nItems={10} data={data} />

        <div className="mt-8 clear-right">
          {page > 1 && (
            <Button onClick={() => gotoPage(page - 1)}>
              &larr; <span className="hidden md:inline">Previous</span>
            </Button>
          )}
          <Button className="float-right" onClick={() => gotoPage(page + 1)}>
            <span className="hidden md:inline">Next</span> &rarr;
          </Button>
        </div>
      </main>
    </>
  );
}
