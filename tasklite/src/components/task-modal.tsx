// src/components/task-modal.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

type TaskModalProps = {
  task: Task;
  onSave: (id: string, title: string, description: string, deadline: Date | null) => void;
  onClose: () => void;
};

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Modal = styled.div<{ visible: boolean }>`
  background: ${(p) => p.theme.colors.surface};
  padding: ${(p) => p.theme.spacing(3)};
  border-radius: ${(p) => p.theme.radius.md};
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(2)};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: scale(${(p) => (p.visible ? 1 : 0.8)});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

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

const TextArea = styled.textarea`
  width: 100%;
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.md};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${(p) => p.theme.colors.textMuted};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(0.5)};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.colors.text};
  font-weight: ${(p) => p.theme.font.weight.medium};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(p) => p.theme.spacing(1)};
  margin-top: ${(p) => p.theme.spacing(2)};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid
    ${(p) => (p.variant === "primary" ? p.theme.colors.accent : p.theme.colors.border)};
  background: ${(p) => (p.variant === "primary" ? p.theme.colors.accent : p.theme.colors.surface)};
  color: ${(p) => (p.variant === "primary" ? "#1a1a1a" : p.theme.colors.text)};
  cursor: pointer;
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  transition: all 0.2s ease;

  &:hover {
    background: ${(p) =>
      p.variant === "primary" ? p.theme.colors.accentHover : p.theme.colors.border};
    border-color: ${(p) =>
      p.variant === "primary" ? p.theme.colors.accentHover : p.theme.colors.accent};
  }
`;

export const TaskModal = (p: TaskModalProps) => {
  const [title, setTitle] = useState(p.task.title);
  const [description, setDescription] = useState(p.task.description ?? "");
  const [deadline, setDeadline] = useState<string>(
    p.task.deadline ? p.task.deadline.toISOString().split("T")[0] : ""
  );
  const [visible, setVisible] = useState(false);

  // Анимация появления
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // Закрытие по Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        setTimeout(p.onClose, 300);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [p]);

  const handleSave = () => {
    if (title.trim() !== "") {
      const deadlineDate = deadline ? new Date(deadline) : null;
      p.onSave(p.task.id, title.trim(), description.trim(), deadlineDate);
      setVisible(false);
      setTimeout(p.onClose, 300);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setTimeout(p.onClose, 300);
  };

  return (
    <Overlay visible={visible}>
      <Modal visible={visible}>
        <h2>Редактирование задачи</h2>
        
        <Label>
          Название задачи:
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название задачи"
          />
        </Label>

        <Label>
          Описание:
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание задачи"
          />
        </Label>

        <Label>
          Дедлайн:
          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </Label>

        <Actions>
          <Button onClick={handleCancel}>Отмена</Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};