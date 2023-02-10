import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.div`
    margin-top: 120px;
    padding: 64px;
    width: 100%;
    background-color: #f5f5f5;
    letter-spacing: 0.5px;
    word-spacing: 1px;
  `;

const FooterContents = styled.div`
    width: 1024px;
    color: #989898;
    font-size: 13px;
  `;

const FooterLink = styled.div`
    display: flex;
    text-align: center;
    a {
      text-decoration: none;
      color: #989898;
    }
  `;

const FooterLinkFirstLine = styled.div`
    display: flex;
    text-decoration: none;
  `;

const DivideBar = styled.span`
    margin-left: 5px;
    margin-right: 5px;
  `;

const FooterHotline = styled.div`
    padding: 37px 0 24px 0;
    height: 81px;
  `;

const Bold = styled.span`
    font-weight: bold;
  `;

const FooterInfo = styled.div`
    height: 151px;
    line-height: 16px;
  `;

const BrandName = styled.div`
    margin-bottom: 10px;
  `;

const BrandInfoDetail = styled.span`
    display: flex;
  `;

const BrandInfoCaution = styled.span`
    display: flex;
    margin-top: 10px;
  `;

const BrandCopyright = styled.span`
    display: flex;
    margin-top: 15px;
    width: 780px;
  `;

const FooterIcons = styled.div`
    display: flex;
    padding-top: 10px;
    width: 621px;
    border-top: 1px solid #ebebeb;
  `;

const FooterIconsEach = styled.div`
    padding: 10px;
  `;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContents>
        <FooterLink>
          <ul>
            <FooterLinkFirstLine>
              <li>
                <Link to="/">회사소개</Link>
                {' '}
                <DivideBar> | </DivideBar>
              </li>
              <li>
                <Link to="/">이용약관</Link>
                {' '}
                <DivideBar> | </DivideBar>
              </li>
              <li>
                <Link to="/">개인정보처리방침</Link>
                {' '}
                <DivideBar> | </DivideBar>
              </li>
              <li>
                <Link to="/">소비자 분쟁해결 기준</Link>
                <DivideBar> | </DivideBar>
              </li>
              <li>
                <Link to="/">사업자 정보확인</Link>
                <DivideBar> | </DivideBar>
              </li>
              <li>
                <Link to="/">마케팅센터</Link>
                {' '}
                <DivideBar> | </DivideBar>
              </li>

              <li>
                <Link to="/">콘텐츠산업진흥법에의한 표시</Link>
              </li>
            </FooterLinkFirstLine>
          </ul>
        </FooterLink>

        <FooterHotline>
          <span className="hotline">
            <Bold>고객행복센터 1235-5678</Bold>
            {' '}
            오전 9시 - 새벽 3시
          </span>
        </FooterHotline>

        <FooterInfo>
          <ul>
            <BrandName>(주) 플모그래피</BrandName>
            <BrandInfoDetail>
              주소 : 서울특별시 성동구 상원12길 34 (성수동1가)
              {' '}
              <DivideBar> | </DivideBar>
              대표이사 : 김코드
              {' '}
              <DivideBar> | </DivideBar>
              {' '}
              사업자등록번호 :
              123-45-67890
            </BrandInfoDetail>
            <BrandInfoDetail>
              통신판매번호 : 2022-서울강남-12345
              {' '}
              <DivideBar> | </DivideBar>
              {' '}
              전화번호 : 1234-5678
              {' '}
              <DivideBar> | </DivideBar>
              {' '}
              전자우편주소 : plmography@plmography.kr
            </BrandInfoDetail>
            <BrandInfoCaution>
              (주) 플모그래피는 통신판매중개자로서 통신판매의 당사자가
              아니며, 상품의 구매, 이용 및 환불 등과 관련한 의무와 책임은 각
              판매자에게 있습니다.
            </BrandInfoCaution>
            <BrandCopyright>
              Copyright Plmography Corp. All rights reserved.
            </BrandCopyright>
          </ul>
        </FooterInfo>
        <FooterIcons>
          <FooterIconsEach>
            <FaFacebook size="22px" color="#7E7E7E" cursor="pointer" />
          </FooterIconsEach>
          <FooterIconsEach>
            <FaInstagramSquare size="22px" color="#7E7E7E" cursor="pointer" />
          </FooterIconsEach>
        </FooterIcons>
      </FooterContents>
    </FooterContainer>
  );
}
