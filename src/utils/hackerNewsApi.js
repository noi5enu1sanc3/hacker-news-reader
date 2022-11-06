const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getResponse = res =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const getNewsIds = async () => {
  const response = await fetch(`${baseUrl}newstories.json`, options);
  return getResponse(response);
};

const getItem = async id => {
  const response = await fetch(`${baseUrl}item/${id}.json`, options);
  return getResponse(response);
};

export { getNewsIds, getItem };
