Feature('컨텐츠 상세 - 고객은 컨텐츠 정보를 얻기 위해 컨텐츠 상세 화면을 볼 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.login();
});

Scenario('컨텐츠 상세 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('아바타');

  I.click('아바타:물의 길');

  // then
  I.see('아바타:물의 길');
  I.see('찜하기');
  I.see('봤어요');
  I.see('지금 여기서 감상');
  I.see('작품 정보');
  I.see('예고편');
  I.see('감독/출연');
  I.see('모든 리뷰');
});

Scenario('리뷰 작성하기 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('아바타');

  I.click('아바타:물의 길');

  I.click('리뷰 작성하기');

  // then
  I.see('이 작품, 어떠셨나요?');
  I.see('별점');
  I.see('간단히 기록하기');
  I.see('작성하기');
});

Scenario('리뷰를 작성한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('아바타');

  I.click('아바타:물의 길');

  I.click('리뷰 작성하기');

  I.fillField('간단히 기록하기', '영상미가 있는 영화입니다. 정말 화려해요!!');

  I.submit();

  // then
  // 어떻게 확인할 수 있을까?
});

Scenario('10자 이내로 리뷰를 작성하고 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('아바타');

  I.click('아바타:물의 길');

  I.click('리뷰 작성하기');

  I.fillField('간단히 기록하기', '재미있어요');

  I.submit('최소 10자 이상 기재하여야 합니다.');

  // then
  I.see('작성하기');
});
