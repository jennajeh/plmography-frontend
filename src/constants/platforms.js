import {
  BtnAppletv,
  BtnDisneyplus, BtnNetflix, BtnTving, BtnWatcha, BtnWavve,
} from '../assets/platform';

const PLATFORMS = [
  {
    id: 1,
    name: 'netflix',
    title: '넷플릭스',
    image: BtnNetflix,
  },
  {
    id: 2,
    name: 'wavve',
    title: '웨이브',
    image: BtnWavve,
  },
  {
    id: 3,
    name: 'watcha',
    title: '왓챠',
    image: BtnWatcha,
  },
  {
    id: 4,
    name: 'disneyplus',
    title: '디즈니 플러스',
    image: BtnDisneyplus,
  },
  {
    id: 5,
    name: 'tving',
    title: '티빙',
    image: BtnTving,
  },
  {
    id: 6,
    name: 'tv.apple',
    title: '애플TV',
    image: BtnAppletv,
  },
];

export default PLATFORMS;
