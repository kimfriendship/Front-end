import React from 'react';
import styled from 'styled-components';
import Rating from '../Global/Rating';
import Button from '../Global/Button';

const StChargeList = styled.ul`
  li {
  }
`;

const ReservationBox = () => {
  return (
    <StWarpper>
      <StStickyWrapper>
        <StReserveBox>
          <h3>요금을 확인하려면 날짜를 입력하세요</h3>
          <Rating rate="4.55" count="687" />
          <Button color="main" border="none" width="100%" padding="14px" hover>
            예약 가능 여부 보기 or 예약 하기
          </Button>
          <StChargeMsg>예약 확정 전에는 요금이 청구되지 않습니다.</StChargeMsg>
          <StChargeList>
            <li>
              <Button btnType="underlined" padding="0" hover>
                ₩17,000 x 2박
              </Button>
              <span>₩34,000</span>
            </li>
          </StChargeList>
        </StReserveBox>
        <StButton>숙소 신고하기</StButton>
      </StStickyWrapper>
    </StWarpper>
  );
};

const StWarpper = styled.div`
  /* background-color: #f9eae8; */
  position: relative;
  margin-left: 8%;
  width: 34%;
`;

const StStickyWrapper = styled.div`
  position: sticky;
  top: 80px;
  text-align: center;
  z-index: 1;
`;

const StReserveBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  text-align: left;
  /* background-color: ${({theme}) => theme.}; */
  padding: 24px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;

  h3 {
    display: inline-block;
    background-color: yellow;
    width: calc(100% - 92px);
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 2.6rem;
    word-break: keep-all;
  }
`;

const StButton = styled.button`
  margin-top: 24px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 14px;
  text-decoration: underline;
  color: ${({ theme }) => theme.darkGray};
`;

const StChargeMsg = styled.div`
  width: 100%;
  margin-top: 8px;
  text-align: center;
  font-size: 14px;
`;

export default ReservationBox;