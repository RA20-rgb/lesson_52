// src/components/search-bar.tsx
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
};

const Input = styled.input`
  width: 100%;
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.md};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${(p) => p.theme.colors.textMuted};
  }
`;

export const SearchBar = (p: SearchBarProps) => {
  return (
    <Input
      type="text"
      placeholder="Поиск задач..."
      value={p.query}
      onChange={(e) => p.onChange(e.target.value)}
    />
  );
};