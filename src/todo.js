// ============================================================
// Модуль todo — капстоун курса Jest.
// createTask уже реализован как ОБРАЗЕЦ. Остальные функции —
// реализуйте сами по TDD: сначала красный тест, потом код.
// Каждая заглушка бросает ошибку, пока вы её не реализуете.
// ============================================================

// ГОТОВО (образец). Возвращает новую активную задачу.
// Бросает ошибку "Название задачи обязательно" на пустом названии.
export function createTask(title) {
  if (!title) {
    throw new Error("Название задачи обязательно");
  }
  return { title, done: false };
}

// TODO: вернуть КОПИЮ задачи с инвертированным done (исходную не менять).
export function toggleTask(task) {
  throw new Error("Не реализовано");
}

// TODO: вернуть НОВЫЙ массив с добавленной задачей (используйте createTask).
export function addTask(tasks, title) {
  throw new Error("Не реализовано");
}

// TODO: вернуть НОВЫЙ массив без задачи с этим названием.
export function removeTask(tasks, title) {
  throw new Error("Не реализовано");
}

// TODO: вернуть задачу с этим названием или undefined.
export function findTask(tasks, title) {
  throw new Error("Не реализовано");
}

// TODO: вернуть число невыполненных задач.
export function countActive(tasks) {
  throw new Error("Не реализовано");
}

// TODO: вернуть объект { total, active, done, titles }.
export function summarizeTasks(tasks) {
  throw new Error("Не реализовано");
}

// TODO (async): взять api.fetchTitles() -> массив названий,
// вернуть массив задач. Ошибку сети пробросить.
export async function loadTasks(api) {
  throw new Error("Не реализовано");
}

// TODO: запланировать storage.save(tasks) через delay мс (по умолчанию 1000).
// Вернуть id таймера.
export function scheduleAutosave(storage, tasks, delay = 1000) {
  throw new Error("Не реализовано");
}
