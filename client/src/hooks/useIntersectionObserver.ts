import React from "react";

type Props = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};

const useIntersectionObserver = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: Props) => {
  const intObserver = React.useRef<IntersectionObserver | null>(null);

  const lastPositionRef = React.useCallback(
    (entity: Element | null) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      if (entity) intObserver.current.observe(entity);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return { lastPositionRef };
};

export default useIntersectionObserver;
