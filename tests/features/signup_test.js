Feature('회원가입 - 고객은 인증된 회원 자격을 얻기 위해 회원가입을 할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('이메일로 회원가입시 모든 정보를 올바르게 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'Test123!');
  I.fillField('비밀번호 확인', 'Test123!');
  I.fillField('닉네임', '제나얌');
  I.click('여성');
  // 출생연도 선택 처리 해야 함

  I.submit();

  // then
  I.see('회원가입을 축하합니다!');
  I.see('구독 서비스 선택하기');
  I.see('로그아웃');
  I.see('마이페이지');
  I.dontSee('로그인');
});

Scenario('회원가입 정보 입력시 이메일이 중복된 경우', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillField('이메일', 'boni123@gmail.com');
  I.fillField('비밀번호', 'Test123!');
  I.fillField('비밀번호 확인', 'Test123!');
  I.fillField('닉네임', '보니얌');
  I.click('여성');
  // 출생연도 선택 처리 해야 함

  I.submit();

  // then
  I.see('이미 가입되어 있는 이메일입니다.');
});

Scenario('회원가입 정보 입력시 이메일 형식이 잘못된 경우', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillField('이메일', 'jenna123@xxx');
  I.fillField('비밀번호', 'Test123!');
  I.fillField('비밀번호 확인', 'Test123!');
  I.fillField('닉네임', '제나얌');
  I.click('여성');
  // 출생연도 선택 처리 해야 함

  I.submit();

  // then
  I.see('이메일 형식이 올바르지 않습니다.');
});

Scenario('회원가입 정보 입력시 비밀번호 형식이 잘못된 경우', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'xxx');
  I.fillField('비밀번호 확인', 'xxx');
  I.fillField('닉네임', '제나얌');
  I.click('여성');
  // 출생연도 선택 처리 해야 함

  I.submit();

  // then
  I.see('비밀번호 형식이 올바르지 않습니다.');
});

Scenario('회원가입 정보 입력시 비밀번호와 비밀번호 확인이 다른 경우', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'Test123!');
  I.fillField('비밀번호 확인', 'xxx');
  I.fillField('닉네임', '제나얌');
  I.click('여성');
  // 출생연도 선택 처리 해야 함

  I.submit();

  // then
  I.see('비밀번호가 일치하지 않습니다.');
});

Scenario('회원가입 정보 입력시 닉네임 형식이 잘못된 경우 ', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.fillField('이메일', 'jenna123@gmail.com');
  I.fillField('비밀번호', 'Test123!');
  I.fillField('비밀번호 확인', 'Test123!');
  I.fillField('닉네임', '안녕하세요감사해요잘있어요다시만나요아침해가뜨면');
  I.click('여성');
  // 출생연도 선택 처리 해야 함

  I.submit();

  // then
  I.see('닉네임은 20자 이내로 입력해 주세요.');
});
