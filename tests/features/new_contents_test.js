Feature('신작 - 고객은 신규 컨텐츠를 확인하기 위해 신작 메뉴를 클릭할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.setupNewContents();
});

Scenario('신작 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('신작');

  I.click('공개 예정작 보러가기');

  // then
  // my 라디오 버튼 활성화 되어있음
  // all 라디오 버튼 비활성화 되어 있음
  I.see('업데이트 예정');
});

Scenario('신작에서 컨텐츠를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('신작');

  I.click('유포자들');

  // then
  I.see('유포자들');
  I.see('찜하기');
  I.see('봤어요');
  I.see('지금 여기서 감상');
  I.see('작품 정보');
  I.see('예고편');
  I.see('감독/출연');
  I.see('모든 리뷰');
});
