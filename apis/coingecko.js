import axios from 'axios';

const api = new axios.Axios({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export async function getExchangeById(id) {
  const res = await api.get(`/exchanges/${id}`);
  if (res.status !== 200) {
    console.error(`Failed to get exchange (id: ${id})`);
  }
  return JSON.parse(res.data);
}

export async function getExchangeIds() {
  const res = await api.get('/exchanges/list');
  if (res.status !== 200) {
    console.error('Failed to get exchange ids');
  }
  return JSON.parse(res.data);
}

export async function getExchangeSummaries({ itemsPerPage, page }) {
  console.log('getting exchange summaries');
  const res = await api.get('/exchanges', {
    params: { per_page: itemsPerPage, page: page },
  });
  if (res.status !== 200) {
    console.error('Failed to get exchange summaries');
  }
  return JSON.parse(res.data);
}
