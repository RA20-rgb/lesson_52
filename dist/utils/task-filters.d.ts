export type Task = {
    readonly id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};
export type Filter = "all" | "active" | "completed";
export declare function filterByStatus(tasks: Task[], filter: Filter): Task[];
export declare function filterByQuery(tasks: Task[], query: string): Task[];
export declare function sortByDate(tasks: Task[]): Task[];
//# sourceMappingURL=task-filters.d.ts.map