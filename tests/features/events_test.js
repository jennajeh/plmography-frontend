Feature('이벤트 - 고객은 진행중인 현재 진행되고 있거나 종료된 이벤트의 정보를 확인하기 위해 이벤트 메뉴를 클릭할 수 있다.');

Before(({ I }) => {
  I.setupEvents();
});

Scenario('홈 화면에서 이벤트를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('이벤트');

  // then
  I.see('진행중 이벤트');
  I.see('지난 이벤트');
  I.see('나의 이벤트');
});

Scenario('홈 화면에서 진행중 이벤트를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('이벤트');

  I.click('진행중 이벤트');

  // then
  I.see('응모하기');
});

Scenario('홈 화면에서 나의 이벤트를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('이벤트');

  I.click('나의 이벤트');

  // then
  I.see('참여 완료');
});
