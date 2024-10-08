import Button from '@components/common/Button/Button';
import Logo from '@components/common/Logo';
import styled from '@emotion/styled';
import { Common } from '@styles/globalStyle';

interface Props {
  key: number;
  image: string;
  storeName: string;
  address: string;
  category: string;
}
const Store = ({ image, storeName, address, category }: Props) => {
  return (
    <Wrapper>
      <Logo image={image} />
      <DescriptWrapper>
        <Category>[{category}]</Category>
        <Title>{storeName}</Title>
        주문마감 :<Address>픽업 | {address}</Address>
      </DescriptWrapper>
      <Button label="선택" bgColor={Common.colors.primary} radius="15px" />
    </Wrapper>
  );
};
export default Store;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 40px;
`;

const DescriptWrapper = styled.div``;

const Category = styled.div`
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
const Address = styled.div``;
