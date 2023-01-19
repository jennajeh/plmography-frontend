Feature('커뮤니티 - 고객은 다른 유저와 소통하기 위해 커뮤니티를 이용할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인하고 커뮤니티를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.login();

  I.click('커뮤니티');

  // then
  I.see('인기글');
  I.see('인기 태그');
  I.see('내가 쓴 글');
  I.see('내가 쓴 댓글');
  I.see('글 작성하기');
});

Scenario('로그인하지 않고 커뮤니티를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('커뮤니티');

  // then
  I.see('인기글');
  I.see('인기 태그');
  I.see('글 작성하기');
  I.dontSee('내가 쓴 글');
  I.dontSee('내가 쓴 댓글');
});

Scenario('커뮤니티 인기글을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('커뮤니티');

  // 인기글 게시물 중 하나 클릭

  // then
  // 해당 게시물로 이동한다.
  I.amOnPage('/community/post/:id');
});

Scenario('커뮤니티에서 인기 태그를 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('커뮤니티');

  // 인기 태그 선택

  // then
  // 태그 모아보기로 이동한다.
  I.see('글 작성하기');
});
