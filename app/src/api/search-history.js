import { ENV, fn } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { size } from 'lodash';

async function getSearchHistory() {
  try {
    const history = await AsyncStorage.getItem(ENV.STORAGE.SEARCH_HISTORY);

    if (!history) return [];
    const parsedHistory = JSON.parse(history);

    const sortedHistory = [...parsedHistory].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return sortedHistory;
  } catch (error) {
    return [];
  }
}

async function updateSearchHistory(searchText) {
  const history = await getSearchHistory();

  if (size(history) > 10) {
    history.pop();
  }

  history.push({
    search: searchText,
    date: new Date(),
  });

  await AsyncStorage.setItem(
    ENV.STORAGE.SEARCH_HISTORY,
    JSON.stringify(history)
  );
}

export const searchHistoryCtrl = {
  get: getSearchHistory,
  update: updateSearchHistory,
};
