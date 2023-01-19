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
  I.see('카카오로 시작하기');
  I.see('네이버로 시작하기');
  I.see('이메일 로그인');
  I.see('이메일 회원가입');
});

Scenario('이메일로 로그인 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  // Then
  I.see('이메일');
  I.see('비밀번호');
});

Scenario('이메일로 로그인시 모든 정보를 올바르게 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  // then
  I.amOnPage('/');

  I.see('로그아웃');
  I.dontSee('로그인');
});

Scenario('로그인시 존재하지 않는 아이디를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  // then
  I.fillField('이메일', 'xxx@gmail.com');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  I.see('회원 정보가 존재하지 않습니다.');
});

Scenario('로그인시 올바르지 않은 비밀번호를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  // then
  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'xxx');

  I.click('로그인');

  I.see('비밀번호를 다시 확인해 주세요.');
});

Scenario('로그인시 이메일을 입력하지 않은 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  // then
  I.fillField('이메일', '');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  I.see('이메일을 입력해 주세요.');
});

Scenario('로그인시 비밀번호를 입력하지 않은 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  // then
  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', '');

  I.click('로그인');

  I.see('비밀번호를 입력해 주세요');
});

Scenario('로그인 페이지에서 이메일로 회원가입 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 회원가입');

  // then
  I.amOnPage('/signup');
});

Scenario('로그인 페이지에서 비밀번호 재설정 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  I.click('비밀번호 재설정');

  // then
  // 비밀번호 재설정 페이지로 이동
});

Scenario('이메일로 로그인에 성공한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  I.click('이메일로 로그인');

  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'Test123!');

  I.click('로그인');

  // Then
  I.amOnPage('/');
});
