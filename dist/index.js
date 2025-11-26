import { filterByStatus, filterByQuery, sortByDate } from "./utils/task-filters.js";
import { isTask } from "./utils/guards.js";
import formatTitle from "./utils/format.js";
export function makeTask(title) {
    return {
        id: Math.random().toString(36).slice(2, 9),
        title: title.trim(),
        completed: false,
        createdAt: new Date()
    };
}
// остальной код... 
const tasks = [
    makeTask("Купить хлеб"),
    makeTask("Сделать уроки"),
    makeTask("Написать код")
];
// Добавьте проверку на существование элемента
if (tasks[1]) {
    tasks[1].completed = true;
}
console.log("Все задачи:", tasks);
console.log("Только активные:", filterByStatus(tasks, "active"));
console.log("Поиск по 'код':", filterByQuery(tasks, "код"));
console.log("Сортировка:", sortByDate(tasks));
const maybeTask = { id: "x1", title: "Test", completed: false, createdAt: new Date() };
if (isTask(maybeTask)) {
    console.log("Это задача:", maybeTask.title);
}
else {
    console.log("Не задача");
}
console.log(formatTitle("   привет    мир   ")); // "привет мир"
//# sourceMappingURL=index.js.map