/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  isFirst?: boolean;
};

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${(p) => p.theme.spacing(1.5)};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  
  &:hover {
    background-color: ${(p) => p.theme.colors.surface};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const Title = styled.span<{ completed?: boolean; isFirst?: boolean }>`
  text-decoration: ${(p) => (p.completed ? "line-through" : "none")};
  color: ${(p) =>
    p.completed ? p.theme.colors.textMuted : p.theme.colors.text};
  cursor: pointer;
  font-weight: ${(p) => (p.isFirst ? p.theme.font.weight.bold : p.theme.font.weight.regular)};
  margin-bottom: ${(p) => p.theme.spacing(0.5)};
  user-select: none;
`;

const Description = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.colors.textMuted};
  font-weight: normal;
  margin-top: ${(p) => p.theme.spacing(0.5)};
  line-height: 1.5;
`;

const DatesRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${(p) => p.theme.spacing(1)};
  font-size: 12px;
  margin-top: 2px;
`;

const DateText = styled.span`
  color: ${(p) => p.theme.colors.textMuted};
  font-weight: ${(p) => p.theme.font.weight.regular};
`;

const DeadlineText = styled.span<{ color: string }>`
  color: ${(p) => p.color};
  font-weight: normal;
`;

const Arrow = styled.span`
  color: ${(p) => p.theme.colors.textMuted};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(0.5)};
  align-items: center;
`;

const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: ${(p) => p.theme.spacing(0.5)};
  border-radius: ${(p) => p.theme.radius.sm};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${(p) => p.theme.colors.textMuted};
  
  &:hover {
    background: ${(p) => p.theme.colors.border};
    color: ${(p) => p.theme.colors.accent};
  }
  
  &:last-child:hover {
    background: ${(p) => p.theme.colors.error}20;
    color: ${(p) => p.theme.colors.error};
  }
`;

export const TaskItem = ({ task, onToggle, onRemove, onEdit, isFirst }: TaskItemProps) => {
  const theme = useTheme();

  const getDeadlineColor = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    if (days < 0) return theme.colors.error; // просрочено
    if (days <= 1) return theme.colors.warning; // сегодня или завтра
    if (days <= 3) return theme.colors.accent; // в течение 3 дней
    return theme.colors.textMuted; // позже 3 дней
  };

  return (
    <ListItem>
      <Content>
        <Title
          completed={task.completed}
          isFirst={isFirst}
          onClick={() => onToggle(task.id)}
        >
          {task.title}
        </Title>

        {/* Описание всегда отображается если есть */}
        {task.description && task.description.trim() !== "" && (
          <Description>
            {task.description}
          </Description>
        )}

        {/* Даты создания и дедлайна */}
        <DatesRow>
          <DateText>
            {task.createdAt.toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit", 
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </DateText>

          {task.deadline && (
            <>
              <Arrow>→</Arrow>
              <DeadlineText color={getDeadlineColor(task.deadline)}>
                {task.deadline.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </DeadlineText>
            </>
          )}
        </DatesRow>
      </Content>
      
      <ButtonsContainer>
        <IconButton 
          onClick={() => onEdit(task)} 
          aria-label="Изменить"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
        <IconButton 
          onClick={() => onRemove(task.id)} 
          aria-label="Удалить"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M19 5L5 19M5.00001 5L19 19" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
      </ButtonsContainer>
    </ListItem>
  );
};