export default function ContentDetailReviews() {
  const accessToken = 'ACCESS TOKEN';

  const reviews = 'reviews';

  return (
    <div>
      {accessToken ? (
        <div>
          <h3>내가 쓴 리뷰</h3>
        </div>
      ) : (
        <div>
          <h3>아아</h3>
        </div>
      )}
    </div>
  );
}
