Feature('홈 화면 - 고객은 원하는 영상을 찾기 위해 홈 피드를 확인하고 메뉴바를 클릭할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인하지 않고 홈 화면에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // then
  I.see('로그인');
  I.see('이벤트');
  I.see('작품 제안');
  I.see('테마 추천');
  I.see('커뮤니티');
  I.see('탐색');
  I.see('신작');
  I.see('오늘의 통합 랭킹');
  I.see('커뮤니티 인기글');
  I.dontSee('로그아웃');
});

Scenario('로그인하고 홈 화면에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.login();

  // then
  I.see('로그아웃');
  I.see('마이 페이지');
  I.see('이벤트');
  I.see('작품 제안');
  I.see('테마 추천');
  I.see('커뮤니티');
  I.see('탐색');
  I.see('신작');
  I.see('오늘의 통합 랭킹');
  I.see('커뮤니티 인기글');
  I.dontSee('로그인');
});

Scenario('오늘의 통합 랭킹을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('오늘의 통합 랭킹');

  // then
  I.see('통합');
  // ott 플랫폼 버튼 보기
  I.see('아바타:물의 길');
});

Scenario('오늘의 통합 랭킹에서 플랫폼 서비스를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('오늘의 통합 랭킹');

  // 웨이브 버튼 클릭하기

  // then

  // 화면이 새로고침 된다.
});

Scenario('오늘의 통합 랭킹에서 컨텐츠 영상물을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('오늘의 통합 랭킹');

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

Scenario('홈 화면에서 배우를 검색한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('김혜수');

  // then
  I.see('배우');
  I.see('김혜수');
});

Scenario('배우를 검색한 후 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('김혜수');
  I.click('김혜수');

  // then
  I.see('소년심판');
  I.see('슈룹');
  I.see('하이에나');
});

Scenario('작품을 검색한 후 클릭한 경우', ({ I }) => {
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

Scenario('검색 결과가 존재하지 않는 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.search('갺');

  // then
  I.see('검색 결과가 없습니다.');
  I.see('제안하기');
});

Scenario('"플모 회원이 보고있어요" 에서 필터링을 하기 위해 토글을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  // 20대 여성 토글 클릭

  // then
  I.see('성별 및 연령');
  I.see('내가 팔로잉한 사람');
});

Scenario('"플모 회원이 보고있어요" 의 토글에서 성별 및 연령을 선택한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  // 20대 여성 토글 클릭
  I.click('성별 및 연령');

  // then
  I.see('성별');
  I.see('여성');
  I.see('남성');
  I.see('출생 연도');
  I.see('저장');
});

Scenario('"플모 회원이 보고있어요" 의 토글에서 내가 팔로잉한 사람이 없는데 선택한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  // 20대 여성 토글 클릭
  I.click('내가 팔로잉한 사람');

  // then
  I.see('팔로잉 된 친구가 없습니다. 다른 사람을 팔로우 한 후 이용해 주세요.');
});

Scenario('"다른 인증회원의 인생작이 궁금하다면?" 을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('다른 인증회원의 인생작이 궁금하다면?');

  // then
  // 작품 리스트로 이동
});

Scenario('"다른 인증회원의 인생작이 궁금하다면?" 에서 작품을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('다른 인증회원의 인생작이 궁금하다면?');

  I.click('아바타');

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
