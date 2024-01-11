import styled from "styled-components";
export const OrderStyled = styled.div`
 padding: 100px 0;
 .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #fafafa;
 }
 .prod {
  display: flex;
  flex-direction: column;
  &__item {
   height: 200px;
   padding: 10px 20px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-bottom: 1px solid #fafafa;
   .info-prod {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
     width: 100px;
    }
    .content {
     display: flex;
     flex-direction: column;
     gap: 10px;
     .name {
      font-size: 18px;
      font-weight: 500;
     }
    }
   }
  }
 }
 .total {
  padding: 30px 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  gap: 20px;
  .price {
   span {
    font-size: 20px;
    font-weight: 600;
   }
  }
 }
`;
