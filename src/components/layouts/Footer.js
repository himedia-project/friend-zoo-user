import React from 'react';
import '../../css/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-column">
                <h5 className="footer-title">이용안내</h5>
                <p className="footer-text gray-text">검수기준</p>
                <p className="footer-text gray-text">이용정책</p>
                <p className="footer-text gray-text">패널티 정책</p>
                <p className="footer-text gray-text">커뮤니티 가이드라인</p>
            </div>
            <div className="footer-column">
                <h5 className="footer-title">고객지원</h5>
                <p className="footer-text gray-text">공지사항</p>
                <p className="footer-text gray-text">서비스 소개</p>
                <p className="footer-text gray-text">스토어 안내</p>
                <p className="footer-text gray-text">판매자 방문접수</p>
            </div>
            <div className="footer-column">
                <h5 className="footer-title">고객센터 1588-7813</h5>
                <p className="footer-text gray-text">
                    운영시간 평일 10:00 ~ 18:00(토,일 공휴일 휴무)
                    <br />
                    점심시간 평일 13:00 ~ 14:00
                </p>
                <p className="footer-text">1:1 문의하기는 앱에서만 가능합니다.</p>
                <div className="faq-box">
                    <p className="faq-text">자주 묻는 질문</p>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
                <p className="footer-text">회사소개</p>
                <p className="footer-text bold-text">인재채용</p>
                <p className="footer-text">제휴제안</p>
                <p className="footer-text">이용약관</p>
                <p className="footer-text bold-text">개인정보처리방침</p>
                <p className="footer-text bold-text">신한은행 채무지급보증 안내</p>
                <p className="footer-text">크림 주식회사 · 대표 김창욱</p>
                <p className="footer-text">사업장소재지 : 경기도 성남시 분당구 분당내곡로 131 판교테크원 타워1, 7층</p>
                <p className="footer-text">
                    당사는 고객님의 현금 결제 금액에 대해 신한은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
                </p>
                <p className="footer-text">
                    크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은 개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은 각 판매자에게 있습니다. 단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용 등에 따라 검수하고 보증하는 내용에 대한 책임은 크림(주)에 있습니다.
                </p>
                <p className="footer-text">
                    <span>사업자등록번호 : 570-88-01618 </span>
                    <a
                        href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=5708801618"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="footer-link"
                    >
                        사업자정보확인
                    </a>
                </p>
                <p className="footer-text">통신판매업 : 제 2021-성남분당C-0093호</p>
                <p className="footer-text">호스팅 서비스 : 네이버 클라우드 ㈜</p>
                <a
                    href="https://kream.co.kr/?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=NEW_%EC%9E%90%EC%82%AC%EB%AA%85_%EC%88%98%EB%8F%99_PC&amp;utm_term=%ED%81%AC%EB%A6%BC&amp;utm_content=A.%20%EC%9E%90%EC%82%AC%EB%AA%85_%EC%88%98%EB%8F%99&amp;gad_source=1&amp;gclid=Cj0KCQiAvbm7BhC5ARIsAFjwNHuw9NLEf4SorI6snl5kqTisIFEigYOq17ow1LMZGlmGduRMEElDf4IaAo5zEALw_wcB#"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="footer-link"
                >
                    서비스가입 사실 확인
                </a>
            </div>
        </div>
    );
};

export default Footer;

