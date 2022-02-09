export const createObserver = (
  list,
  bests,
  hit,
  page,
  setPage,
  intersecting,
  setIntersecting
) => {
  const listHeight = JSON.stringify(
    list.current.getBoundingClientRect().height
  );
  const innerHeight = window.innerHeight + 100;

  if (!bests && listHeight > innerHeight) {
    return new IntersectionObserver(
      ([results]) => {
        if (results.isIntersecting && !intersecting) {
          if (page < hit.pages) {
            setIntersecting(true);
          }
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: `0px 0px ${innerHeight}px 0px`,
      }
    );
  }
};
