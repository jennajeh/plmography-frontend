Feature('홈 화면 - 고객은 원하는 영상을 찾기 위해 홈 피드를 확인하고 메뉴바를 클릭할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인하지 않고 홈 화면에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  I.login('jenna@gmail.com');

  // then
  I.see('로그인');
  I.see('이벤트');
  I.see('테마 추천');
  I.see('커뮤니티');
  I.see('탐색');
  I.see('오늘의 TOP 6');
  I.see('커뮤니티 인기글');
  I.dontSee('로그아웃');
});

Scenario('로그인하고 홈 화면에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.login('jenna@gmail.com');

  // then
  I.see('로그아웃');
  I.dontSee('로그인');
});

Scenario('오늘의 TOP 6 에서 컨텐츠를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  I.login('jenna@gmail.com');

  // When
  I.click('아바타:물의 길');

  I.see('찜하기');
  I.see('봤어요');
  I.see('출연');
});
