Feature('로그인 - 고객은 자신임을 증명하기 위해 로그인 할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // Then
  I.see('로그인');
  I.see('카카오 로그인');
  I.see('회원가입');
});

Scenario('이메일로 로그인 할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.fillField('이메일', 'jenna@gmail.com');
  I.fillField('비밀번호', 'Test123!');

  // Then
  I.see('로그아웃');
});

Scenario('로그인시 존재하지 않는 아이디를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // then
  I.fillField('이메일', 'xxx@gmail.com');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  I.see('이메일 혹은 비밀번호가 맞지 않습니다');
});

Scenario('로그인시 올바르지 않은 비밀번호를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // then
  I.fillField('이메일', 'jenna@gmail.com');
  I.fillField('비밀번호', 'xxx');

  I.click('로그인');

  I.see('이메일 혹은 비밀번호가 맞지 않습니다');
});

Scenario('로그인시 이메일을 입력하지 않은 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // then
  I.fillField('이메일', '');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  I.see('이메일을 입력해 주세요');
});

Scenario('로그인시 비밀번호를 입력하지 않은 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // then
  I.fillField('이메일', 'jenna@gmail.com');
  I.fillField('비밀번호', '');

  I.click('로그인');

  I.see('비밀번호를 입력해 주세요');
});

Scenario('이메일로 로그인에 성공한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.fillField('이메일', 'jenna@gmail.com');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  // Then
  I.amOnPage('/');
});
