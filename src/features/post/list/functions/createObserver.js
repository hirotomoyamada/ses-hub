export const createObserver = (
  list,
  load,
  hit,
  page,
  setPage,
  intersecting,
  setIntersecting
) => {
  if (
    JSON.stringify(list.current.getBoundingClientRect().height) >
    window.innerHeight + 100
  ) {
    const observer = new IntersectionObserver(
      ([results]) => {
        if (results.isIntersecting && !intersecting) {
          if (page < hit.pages) {
            setIntersecting(results.isIntersecting);
          }
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: `0px 0px ${window.innerHeight}px 0px`,
      }
    );

    const ref = load.current;
    ref && observer.observe(ref);

    return () => {
      ref && observer.unobserve(ref);
    };
  }
};
