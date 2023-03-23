/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
    this.amOnPage(`${backdoorBaseUrl}/setup-content`);
    this.amOnPage(`${backdoorBaseUrl}/setup-movie`);
    this.amOnPage(`${backdoorBaseUrl}/setup-tv`);
    this.amOnPage(`${backdoorBaseUrl}/setup-content-data`);
    this.amOnPage('/');
  },

  login(email) {
    this.setupDatabase();
    this.amOnPage('/login');

    this.fillField('이메일', email);
    this.fillField('비밀번호', 'Test123!!');
    this.submit();

    this.waitForText('로그아웃');
  },

  submit() {
    this.click('[type=submit]');
  },

  writeReview() {
    this.setupDatabase();
    this.amOnPage('/login');
    this.amOnPage('/');
    this.click('탐색');

    this.fillField('검색', '슈렉');

    this.click('슈렉');

    this.click('리뷰 작성하기');

    this.fillField('input-body', '재미있어요');
    this.click('등록하기');
    this.wait(2);
  },
});
