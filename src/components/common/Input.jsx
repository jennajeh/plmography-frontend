/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${(props) => `${props.width}` || 35}px;
  height: ${(props) => `${props.height}` || 35}px;
  border: ${(props) => (`1px solid ${props.error ? '#FF424D' : '#D8D8D8'}`)};
  border-radius: 5px;
  color: ${((props) => props.theme.text.gray)};
  margin-bottom: 20px;
  & + & {
    margin-top: 16px;
  }
  
  :focus {
    outline: none;
    border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#22DAAB'}`)};
    color: #666666;
  }
`;

const Label = styled.label`
  font-weight: 700;
  color: inherit;
  margin-bottom: 20px;
`;

const Required = styled.span`
  color: #FF424D;
`;

const Message = styled.p`
  color: inherit;
`;

const Error = styled.p`
  color: #FF424D;
  padding-top: 1rem;
`;

export default function Input({
  name, label, type, placeholder, value, maxLength = '', width, height, onChange, message, errorMessage, required = false,
}) {
  return (
    <div>
      <Label
        htmlFor={`input-${name}`}
      >
        {label}
        {required
          ? (
            <Required>
              *
            </Required>
          )
          : null}
      </Label>
      <StyledInput
        width={width}
        height={height}
        type={type}
        name={name}
        placeholder={placeholder}
        id={`input-${name}`}
        value={value}
        error={errorMessage}
        maxLength={maxLength}
        onChange={onChange}
      />
      {errorMessage
        ? <Error>{errorMessage}</Error>
        : <Message>{message}</Message>}
    </div>
  );
}
