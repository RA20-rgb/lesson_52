export type Task = {
  readonly id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  description?: string;
  deadline?: Date | null;
};

export const MAX_TITLE_LENGTH = 50;

export function makeTask(title: string): Task {
  const trimmedTitle = title.trim();
  
  if (trimmedTitle.length === 0) {
    throw new Error("Название задачи не может быть пустым");
  }
  
  if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    throw new Error(`Название задачи слишком длинное (макс. ${MAX_TITLE_LENGTH} символов)`);
  }

  return {
    id: Math.random().toString(36).slice(2, 9),
    title: trimmedTitle,
    completed: false,
    createdAt: new Date(),
    description: "",
    deadline: null,
  };
}