import styled from "styled-components";

const WrapperFormLogin = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  gap: 1em;
  width: 100%;
`;

const ContainerFormLogin = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: min(80%, 98em);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(1em, 4svw, 5em);
`;

export function Home() {
  return (
    <WrapperFormLogin>
      <ContainerFormLogin>
        <h1>Opaaaaaaaaaaaaaaaaaaaaaaaa</h1>
      </ContainerFormLogin>
    </WrapperFormLogin>
  );
}
