export type TaskDraft = Partial<Task>;
export type Task = {
    readonly id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};
export type AppConfig = Readonly<{
    appName: string;
    version: string;
}>;
//# sourceMappingURL=types.d.ts.map