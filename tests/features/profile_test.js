Feature('마이 페이지 - 고객은 자신의 정보를 확인하고 편집하기 위해 마이페이지를 클릭할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.login();
});

Scenario('마이 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('마이 페이지');

  // then
  I.see('닉네임');
  I.see('팔로잉');
  I.see('팔로워');
  I.see('찜했어요');
  I.see('봤어요');
  I.see('작성한 리뷰');
  I.see('구독중인 서비스');
  I.see('인생 작품');
  I.see('찜한 리스트');
});

Scenario('마이 페이지에서 편집 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('마이 페이지');

  // 편집 버튼 누르기

  // then
  I.see('프로필 수정');
  I.see('닉네임');
  I.see('소개');
  I.see('저장');
});
