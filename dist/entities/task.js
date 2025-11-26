import { generateId } from "../utils/id.js";
export function makeTask(title) {
    return {
        id: generateId(),
        title: title,
        completed: false,
        createdAt: new Date()
    };
}
//# sourceMappingURL=task.js.map