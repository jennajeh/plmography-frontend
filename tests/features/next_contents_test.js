Feature('공개 예정작 - 고객은 공개예정인 작품들을 확인하기 위해 공개 예정작을 클릭할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.setupNewContents();
});

Scenario('공개 예정작 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('신작');

  I.click('공개 예정작 보러가기');

  // then
  // my 라디오 버튼 활성화 되어있음
  // all 라디오 버튼 비활성화 되어 있음
  I.see('공개 예정작 보러가기');
  I.see('11편 업데이트 됨');
});

Scenario('공개 예정작 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('신작');

  I.click('공개 예정작 보러가기');

  // then
  // my 라디오 버튼 활성화 되어있음
  // all 라디오 버튼 비활성화 되어 있음
  I.see('공개 예정작 보러가기');
  I.see('11편 업데이트 됨');
});
