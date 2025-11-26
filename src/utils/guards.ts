export type Task = {
  readonly id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "title" in obj &&
    "completed" in obj &&
    "createdAt" in obj
  );
}