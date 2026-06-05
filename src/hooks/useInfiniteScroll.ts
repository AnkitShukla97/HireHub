import { useEffect, RefObject } from 'react';

/**
 * Custom hook for infinite scroll functionality using IntersectionObserver
 * Calls a callback when the loader element enters the viewport
 * 
 * @param loaderRef - Ref to the loader element to observe
 * @param callback - Function to call when loader enters viewport
 * @param options - Optional IntersectionObserver options
 * 
 * @example
 * const loaderRef = useRef<HTMLDivElement>(null);
 * 
 * const loadMore = () => {
 *   setPage(prev => prev + 1);
 * };
 * 
 * useInfiniteScroll(loaderRef, loadMore);
 * 
 * return (
 *   <>
 *     <div className="jobs-list">
 *       {jobs.map(job => <JobCard key={job.id} job={job} />)}
 *     </div>
 *     <div ref={loaderRef} className="loader">
 *       {isLoading && <Spinner />}
 *     </div>
 *   </>
 * );
 */
export const useInfiniteScroll = (
  loaderRef: RefObject<HTMLElement | null>,
  callback: () => void,
  options?: IntersectionObserverInit
): void => {
  useEffect(() => {
    // Ensure loader ref exists
    if (!loaderRef.current) {
      return;
    }

    // Default IntersectionObserver options
    const defaultOptions: IntersectionObserverInit = {
      root: null, // Use viewport as root
      rootMargin: '100px', // Trigger 100px before element enters viewport
      threshold: 0, // Trigger as soon as any part is visible
      ...options, // Allow override of defaults
    };

    // Create IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Fire callback when loader element enters viewport
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, defaultOptions);

    // Start observing the loader element
    observer.observe(loaderRef.current);

    // Cleanup: stop observing when component unmounts or dependencies change
    return () => {
      observer.disconnect();
    };
  }, [loaderRef, callback, options]);
};
