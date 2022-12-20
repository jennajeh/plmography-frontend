Feature('작품제안 - 고객은 원하는 작품의 등록을 요청하거나 문의 사항을 등록하기 위해 작품 제안을 이용할 수 있다.');

Scenario('작품 제안 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('작품 제안');

  // then
  I.see('문의/제안');
  I.see('DB 관련 문의');
  I.see('서비스 이용 문의');
  I.see('로그인 문의');
  I.see('기타 문의');
  I.see('문의 제안 내용');
  I.see('답변 받을 이메일');
  I.see('보내기');
});

Scenario('작품 제안 페이지에서 보고싶은 작품을 요청한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('작품 제안');

  // textarea 작성 후 보내기 버튼 클릭

  // then
  // 문의가 등록되었습니다 문구 보기
});
