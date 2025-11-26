export type Task = {
    readonly id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};
export type Filter = "all" | "active" | "completed";
export declare function makeTask(title: string): Task;
//# sourceMappingURL=index.d.ts.map