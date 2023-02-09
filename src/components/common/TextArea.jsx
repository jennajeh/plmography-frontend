/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 30em;
  padding: 1.5em;
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};
  color: ${((props) => props.theme.text.gray)};
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
  display: block;
  color: inherit;
`;

const Required = styled.span`
  color: #FF424D;
`;

const Message = styled.p`
  color: inherit;
`;

const Error = styled.p`
  color: #FF424D;
`;

export default function TextArea({
  name, label, type, placeholder, value, maxLength = '', onChange, message, errorMessage, required = false,
}) {
  return (
    <>
      <Label htmlFor={`input-${name}`}>
        {label}
        {required
          ? (
            <Required>
              *
            </Required>
          )
          : null}
      </Label>
      <StyledTextArea
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        error={errorMessage}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
      />
      {errorMessage
        ? <Error>{errorMessage}</Error>
        : <Message>{message}</Message>}
    </>
  );
}
