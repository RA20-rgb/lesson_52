/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./button";
import { MAX_TITLE_LENGTH } from "../entities/task";

type TaskInputProps = {
  onAdd: (title: string) => void;
};

const Wrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

const Input = styled.input`
  flex: 1;
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.md};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${(p) => p.theme.colors.textMuted};
  }
`;

const ErrorText = styled.p`
  color: ${(p) => p.theme.colors.error};
  font-size: 14px;
  margin-top: ${(p) => p.theme.spacing(0.5)};
  margin-bottom: 0;
`;

const CharacterCount = styled.div<{ $isOverLimit: boolean }>`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.$isOverLimit ? p.theme.colors.error : p.theme.colors.textMuted};
  text-align: right;
  margin-top: ${(p) => p.theme.spacing(0.5)};
`;

export const TaskInput = (props: TaskInputProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const characterCount = value.length;
  const isOverLimit = characterCount > MAX_TITLE_LENGTH;

  const handleAdd = () => {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setError("Название задачи не может быть пустым");
      return;
    }

    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError(`Название задачи слишком длинное (макс. ${MAX_TITLE_LENGTH} символов)`);
      return;
    }

    props.onAdd(trimmed);
    setValue("");
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div>
      <Wrapper>
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Введите задачу"
        />
        <Button label="Добавить" onClick={handleAdd} />
      </Wrapper>
      
      {error && <ErrorText>{error}</ErrorText>}
      
      <CharacterCount $isOverLimit={isOverLimit}>
        {characterCount}/{MAX_TITLE_LENGTH}
      </CharacterCount>
    </div>
  );
};