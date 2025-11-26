// src/pages/tasks-page.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { makeTask } from "../entities/task";
import type { Task } from "../entities/task";
import { TaskInput } from "../components/task-input";
import { TaskList } from "../components/task-list";
import { TaskModal } from "../components/task-modal";
import { ProgressBar } from "../components/progress-bar";
import { FilterBar } from "../components/filter-bar";
import { SearchBar } from "../components/search-bar";
import { saveTasks, loadTasks } from "../entities/storage";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(3)};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

const Title = styled.h1`
  color: ${(p) => p.theme.colors.text};
  font-size: 2.5rem;
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin-bottom: ${(p) => p.theme.spacing(1)};
  background: linear-gradient(135deg, #f5df4d 0%, #d9c542 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${(p) => p.theme.colors.textMuted};
  font-size: ${(p) => p.theme.font.size.md};
  margin-bottom: ${(p) => p.theme.spacing(3)};
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(2)};
  background: rgba(255, 255, 255, 0.05);
  padding: ${(p) => p.theme.spacing(3)};
  border-radius: ${(p) => p.theme.radius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const TasksSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(2)};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: ${(p) => p.theme.spacing(3)};
  border-top: 1px solid ${(p) => p.theme.colors.border};
  background: rgba(255, 255, 255, 0.02);
  border-radius: ${(p) => p.theme.radius.lg};
`;

const Counter = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.colors.textMuted};
  margin: 0;
  font-weight: ${(p) => p.theme.font.weight.medium};
`;

const ClearButton = styled.button<{ disabled?: boolean }>`
  border: 1px dashed ${(p) => p.theme.colors.border};
  background: transparent;
  color: ${(p) => p.theme.colors.textMuted};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border-radius: ${(p) => p.theme.radius.sm};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${(p) => `${p.theme.colors.accent}20`};
    border-color: ${(p) => p.theme.colors.accent};
    color: ${(p) => p.theme.colors.accent};
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${(p) => p.theme.colors.textMuted};
  padding: ${(p) => p.theme.spacing(6)};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${(p) => p.theme.radius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &::before {
    content: "📝";
    font-size: 3rem;
    display: block;
    margin-bottom: ${(p) => p.theme.spacing(2)};
  }
`;

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;
  const hasCompletedTasks = completedCount > 0;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];
    if (sort === "newest") {
      return tasksCopy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else {
      return tasksCopy.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
  }, [tasks, sort]);

  const filteredTasks = useMemo(() => {
    return sortedTasks.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });
  }, [sortedTasks, filter]);

  const searchedTasks = useMemo(() => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return filteredTasks;
    
    return filteredTasks.filter((t) =>
      t.title.toLowerCase().includes(searchTerm)
    );
  }, [filteredTasks, query]);

  const handleAddTask = (title: string) => {
    try {
      const newTask = makeTask(title);
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEditTask = (
    id: string,
    newTitle: string,
    newDescription: string,
    newDeadline: Date | null
  ) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, title: newTitle, description: newDescription, deadline: newDeadline }
          : t
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  return (
    <Wrapper>
      <Header>
        <Title>TaskLite</Title>
        <Subtitle>Управляйте своими задачами эффективно</Subtitle>
      </Header>

      <ControlsSection>
        <TaskInput onAdd={handleAddTask} />
        <SearchBar query={query} onChange={setQuery} />
        <FilterBar 
          filter={filter} 
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
        <ProgressBar percent={percent} />
      </ControlsSection>

      <TasksSection>
        {searchedTasks.length === 0 ? (
          <EmptyState>
            {total === 0
              ? "Пока нет задач. Добавьте первую задачу!" 
              : "Задачи не найдены"}
          </EmptyState>
        ) : (
          <TaskList
            tasks={searchedTasks}
            onToggle={handleToggleTask}
            onRemove={handleRemoveTask}
            onEdit={setEditingTask}
            highlightFirstTask={true}
          />
        )}
      </TasksSection>

      {total > 0 && (
        <Footer>
          <Counter>
            Всего: {total} | Активных: {active} | Выполненных: {completed}
          </Counter>
          <ClearButton
            onClick={handleClearCompleted}
            disabled={!hasCompletedTasks}
          >
            Очистить выполненные
          </ClearButton>
        </Footer>
      )}

      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleEditTask}
        />
      )}
    </Wrapper>
  );
};