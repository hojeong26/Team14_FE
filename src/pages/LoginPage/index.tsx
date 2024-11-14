import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Background from '@components/common/Background/index';
import { HEADER_HEIGHT } from '@components/features/Layout/Header';
import { fetchInstance } from '@api/instance/index';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '@provider/AuthProvider';
import { RouterPath } from '@routes/path';

const KAKAO_CLIENT_ID = '709c9edf5275cd3bedfb03c7f92e7af5';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/login';
const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [isCodeProcessed, setIsCodeProcessed] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code && !isCodeProcessed) {
      if (sessionStorage.getItem('codeProcessed')) return;

      setIsCodeProcessed(true);
      sessionStorage.setItem('codeProcessed', 'true');
      // http://3.39.23.121:8080/api/v1/auth/login
      // https://order-together.duckdns.org/api/v1/auth/login
      // http://43.203.132.224:8080/api/v1/auth/login
      fetchInstance
        .get(`http://43.203.132.224:8080/api/v1/auth/login`, {
          headers: {
            Authorization: `Bearer ${code}`,
            'Content-Type': 'application/json',
          },
          maxRedirects: 0,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 302) {
            console.log('302', response);

            window.location.href = response.data.redirectURL;
          }
          console.log(response);
          if (response.status === 302) {
            console.log('302', response);

            window.location.href = response.data.redirectURL;
          }
          const accessToken = response.data.data;
          if (accessToken) {
            Cookies.set('access_token', accessToken);
            setIsLoggedIn(true);
            navigate(RouterPath.root);
            navigate(0);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error);
          if (error.response) {
            if (error.response.status === 404) {
              console.log(error.request.responseURL);
              console.log(error.request.responseURL);
              const redirectUrl = error.request.responseURL;
              if (redirectUrl) {
                window.location.href = redirectUrl;
              }
            } else {
              navigate(RouterPath.root);
            }
          } else {
            navigate(RouterPath.root);
          }
        });
    }
  }, [location.search, isCodeProcessed, navigate, setIsLoggedIn]);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `${KAKAO_AUTH_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <Wrapper>
      <Background left>
        <Content>
          <Title>LOGIN</Title>
          <SubTitle>다같이 시켜먹어요</SubTitle>
          <HighlightText>요기 먹때에서</HighlightText>
          <ButtonWrapper>
            <KakaoButton onClick={handleKakaoLogin}>
              <KakaoIcon src="/image/kakaoLogin.png" alt="카카오 로그인" />
            </KakaoButton>
          </ButtonWrapper>
        </Content>
      </Background>
      <Background />
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  position: relative;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 400px;
  height: 100%;
`;

const Title = styled.h1`
  font-family: PaperlogyBold;
  font-size: 70px;
  margin: 0;
`;

const SubTitle = styled.p`
  font-family: PaperlogyLight;
  font-size: 45px;
  color: #505050;
  margin-bottom: 0;
`;

const HighlightText = styled.p`
  font-family: PaperlogyBold;
  font-size: 45px;
  color: #059770;
  margin-top: 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 400px;
  height: 71px;
`;
