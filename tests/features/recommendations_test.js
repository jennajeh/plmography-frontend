Feature('테마 추천 - 고객은 원하는 테마의 영상 목록을 확인하기 위해 테마 추천을 클릭할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('테마 추천 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('테마 추천');

  // then
  I.see('추천 큐레이션');
  I.see('에디터 추천');
  I.see('무료 컨텐츠 모음');
});

Scenario('테마를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('테마 추천');
  I.click('에디터 추천');

  // then
  I.see('이번 주엔 이거 보세요');
  I.see('22년 12월 1주차 에디터 픽');
});

Scenario('테마에서 리스트 중 하나를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('테마 추천');
  I.click('에디터 추천');
  I.click('이번 주엔 이거 보세요');

  // then
  // my 라디오 버튼 활성화 되어있음
  // all 라디오 버튼 비활성화 되어 있음
  I.see('장르');
  I.see('등급');
  I.see('등록순');
  I.see('이만큼 봤어요');
});
