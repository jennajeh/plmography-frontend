/* eslint-disable import/prefer-default-export */
export function filterOptions() {
  const exploreCategory = [
    {
      id: 0,
      category: 'filmOrTv',
      categoryLists: [
        { id: 0, name: 'film', selected: false },
        { id: 1, name: 'Tv', selected: false },
      ],
    },
    {
      id: 1,
      category: 'nation',
      categoryLists: [
        { id: 0, name: 'Korea', selected: false },
        { id: 1, name: 'USA', selected: false },
        { id: 2, name: 'UK', selected: false },
        { id: 3, name: 'Japan', selected: false },
        { id: 4, name: 'China', selected: false },
        { id: 5, name: 'France', selected: false },
        { id: 6, name: 'HongKong', selected: false },
        { id: 7, name: 'Taiwan', selected: false },
        { id: 8, name: 'Germany', selected: false },
        { id: 9, name: 'Canada', selected: false },
        { id: 10, name: 'Italy', selected: false },
        { id: 11, name: 'Russia', selected: false },
        { id: 12, name: 'Australia', selected: false },
        { id: 13, name: 'Spain', selected: false },
        { id: 14, name: 'India', selected: false },
        { id: 15, name: 'Belgium', selected: false },
        { id: 16, name: 'Sweden', selected: false },
        { id: 17, name: 'Mexico', selected: false },
        { id: 18, name: 'Iran', selected: false },
        { id: 19, name: 'Brazil', selected: false },
      ],
    },
    {
      id: 2,
      category: 'genre',
      categoryLists: [
        { id: 0, name: 'action', selected: false },
        { id: 1, name: 'SF', selected: false },
        { id: 2, name: 'fantasy', selected: false },
        { id: 3, name: 'adventure', selected: false },
        { id: 4, name: 'crime', selected: false },
        { id: 5, name: 'thriller', selected: false },
        { id: 6, name: 'mystery', selected: false },
        { id: 7, name: 'comedy', selected: false },
        { id: 8, name: 'romance', selected: false },
        { id: 9, name: 'drama', selected: false },
        { id: 10, name: 'animation', selected: false },
        { id: 11, name: 'horror', selected: false },
        { id: 12, name: 'variety', selected: false },
        { id: 13, name: 'documentary', selected: false },
        { id: 14, name: 'music', selected: false },
        { id: 15, name: 'family', selected: false },
        { id: 16, name: 'western', selected: false },
        { id: 17, name: 'war', selected: false },
        { id: 18, name: 'performance', selected: false },
        { id: 19, name: 'adult', selected: false },
      ],
    },
    {
      id: 3,
      category: 'film-rating',
      categoryLists: [
        { id: 0, name: 'for-all', selected: false },
        { id: 1, name: 'above-12', selected: false },
        { id: 2, name: 'above-15', selected: false },
        { id: 3, name: 'for-adult', selected: false },
      ],
    },
  ];

  return exploreCategory;
}

export function platform() {
  const platformCategory = [
    { id: 0, platform: 'netflix', selected: false },
    { id: 1, platform: 'wavve', selected: false },
    { id: 2, platform: 'tving', selected: false },
    { id: 3, platform: 'disney-plus', selected: false },
    { id: 4, platform: 'watcha', selected: false },
    { id: 5, platform: 'coupang-play', selected: false },
    { id: 6, platform: 'apple-tv', selected: false },
  ];

  return platformCategory;
}
