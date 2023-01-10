import { useLocalStorage } from 'usehooks-ts';

export default function ContentDetailReviews() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const reviews = 'reviews';

  return (
    <div>
      {accessToken ? (
        <div>
          <h3 style={{ color: 'red' }}>리뷰</h3>
          <div>
            <h4 style={{ color: 'blue' }}>내가 쓴 리뷰</h4>
          </div>
          <div>
            <h4 style={{ color: 'blue' }}>모든 리뷰</h4>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: 'red' }}>아아</h3>
        </div>
      )}
    </div>
  );
}
