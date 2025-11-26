export type Task = {
    readonly id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};
export declare function isTask(obj: unknown): obj is Task;
//# sourceMappingURL=guards.d.ts.map