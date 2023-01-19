Feature('탐색 - 고객은 원하는 영상을 찾기 위해 컨텐츠들의 리스트를 카테고리별로 필터링 할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('탐색 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('탐색');

  // then
  // my 라디오 버튼 활성화 되어있음
  // all 라디오 버튼 비활성화 되어 있음
  I.see('장르');
  I.see('등급');
  I.see('등록순');
  I.see('아바타');
});

Scenario('탐색 메뉴에서 ott 를 추가한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('탐색');
  // 플러스 버튼 클릭

  // then
  I.see('구독 중인 서비스를 선택해 주세요.');
  I.see('디즈니+');
  I.see('전체 취소하기');
  I.see('적용');
});

Scenario('필터링 기능을 사용할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('탐색');
  I.click('장르');

  // then
  // 화면이 새로고침 됨
  I.see('액션');
  I.see('SF');
  I.see('필터 적용');
});
