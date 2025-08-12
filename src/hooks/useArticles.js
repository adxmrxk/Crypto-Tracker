import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client';
import { use } from 'react';

const apiClient = new APIClient('/news/v1/article/list');

const useArticles = (lang_, categories_, limit_, to_ts_) => { 
  return useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          lang: lang_,
          categories: categories_,
          limit: limit_,
          to_ts_: to_ts_
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 60 * 24, 
  });
}

export default useArticles;
