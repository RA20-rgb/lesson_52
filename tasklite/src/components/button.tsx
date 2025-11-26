/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const StyledButton = styled.button`
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid ${(p) => p.theme.colors.accent};
  border-radius: ${(p) => p.theme.radius.sm};
  background: ${(p) => p.theme.colors.accent};
  color: #1a1a1a; /* Темный текст для контраста с желтым */
  cursor: pointer;
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.medium};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${(p) => p.theme.colors.accentHover};
    border-color: ${(p) => p.theme.colors.accentHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
};