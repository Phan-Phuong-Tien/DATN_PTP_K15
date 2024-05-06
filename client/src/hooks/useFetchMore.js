import { useState } from "react";

export default function useFetchMore(length, countInit = 5, countMore = 3) {
  const [hasMore, setHasMore] = useState(true);
  const [countItem, setCountItem] = useState(countInit);

  const fetchMoreData = () => {
    if (countItem >= length) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 5 more records in 1 secs
    setTimeout(() => {
      setCountItem(countItem + countMore);
    }, 1000);
  };

  return { hasMore, countItem, fetchMoreData };
}
