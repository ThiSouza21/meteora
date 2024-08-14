import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  nameLabel: string;
  error: { message: string; type: string } | null;
}

interface ContainerInputLoginProps {
  $error?: { message: string; type: string } | null;
}

const ContainerInputLogin = styled.div<ContainerInputLoginProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2em;

  > label {
    font-weight: 500;
    font-size: clamp(0.8em, 1svw, 2.2em);
  }

  > p {
    font-size: clamp(0.8em, 1svw, 2.6em);
    color: red;
  }

  > input {
    ${({ $error }) => $error && `border: 1px solid red !important;`}
  }
`;

export const InputLogin = forwardRef<HTMLInputElement, Props>(
  ({ nameLabel, type, placeholder, error, onChange, value }, ref) => {
    return (
      <ContainerInputLogin $error={error}>
        <label htmlFor="">{nameLabel}</label>
        <input
          className="inputLogin"
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {error && <p>{error.message}</p>}
      </ContainerInputLogin>
    );
  }
);
