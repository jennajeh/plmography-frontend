const rangeOf = ({ limit, offset = 0 }) => [...Array(limit).keys()].map((i) => i + 1 + offset);

export default function usePagination({ totalPages, currentPage }) {
  if (totalPages < 8) {
    return [...rangeOf({ limit: totalPages })];
  }

  if (currentPage < 5) {
    return [...rangeOf({ limit: 5 }), '...', totalPages];
  }

  if (totalPages - currentPage < 4) {
    return [1, '...', ...rangeOf({ limit: 5, offset: totalPages - 5 })];
  }

  return [1, '...', ...rangeOf({ limit: 3, offset: currentPage - 2 }), '...', totalPages];
}
