import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Enumerable {
  elements: any[] | null;
}

interface Paginable {
  limit?: number | null;
}

interface Props<Q, V extends Paginable> {
  children(data: Q): JSX.Element;
  variables: V;
  query: DocumentNode;
}

export default function EndlessQuery<Q extends Enumerable, V extends Paginable>(
  props: Props<Q, V>
) {
  const { query, variables, children } = props;

  const [hasMore, setHasMore] = useState(true);

  const { data, loading, fetchMore } = useQuery<Q, V>(query, {
    variables: { ...variables, offset: 0 },
  });

  useEffect(() => {
    const elements = data?.elements;
    if (elements && elements.length && variables.limit)
      setHasMore(elements.length % variables.limit === 0);
  }, [data, variables, setHasMore]);

  const onLoadMore = () => {
    const offset = data?.elements?.length || 0;

    fetchMore({
      variables: { ...variables, offset },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        console.log({ prev, fetchMoreResult, variables });

        if (
          !fetchMoreResult ||
          !fetchMoreResult.elements?.length ||
          !prev.elements?.length
        ) {
          setHasMore(false);
          return prev;
        }
        return {
          ...prev,
          elements: [...prev.elements, ...fetchMoreResult.elements],
        };
      },
    });
  };

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    <InfiniteScroll
      dataLength={data.elements?.length || 0}
      next={onLoadMore}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
    >
      {children(data)}
    </InfiniteScroll>
  );
}
