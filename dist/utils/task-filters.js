export function filterByStatus(tasks, filter) {
    if (filter === "all")
        return tasks;
    if (filter === "active")
        return tasks.filter(t => !t.completed);
    return tasks.filter(t => t.completed);
}
export function filterByQuery(tasks, query) {
    const q = query.trim().toLowerCase();
    if (!q)
        return tasks;
    return tasks.filter(t => t.title.toLowerCase().includes(q));
}
export function sortByDate(tasks) {
    return [...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
//# sourceMappingURL=task-filters.js.map