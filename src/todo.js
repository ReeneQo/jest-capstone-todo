export function createTask(title) {
  if (!title) {
    throw new Error("Название задачи обязательно");
  }
  return { title, done: false };
}

export function toggleTask(task) {
  return { ...task, done: !task.done };
}

export function addTask(tasks, title) {
  return [...tasks, createTask(title)];
}

export function removeTask(tasks, title) {
  return tasks.filter((task) => task.title !== title);
}

export function findTask(tasks, title) {
  return tasks.find((task) => task.title === title);
}

export function countActive(tasks) {
  return tasks.filter((task) => !task.done).length;
}

export function summarizeTasks(tasks) {
  const active = countActive(tasks);

  return {
    total: tasks.length,
    active,
    done: tasks.length - active,
    titles: tasks.map((task) => task.title),
  };
}

export async function loadTasks(api) {
  const titles = await api.fetchTitles();
  return titles.map(createTask);
}

export function scheduleAutosave(storage, tasks, delay = 1000) {
  return setTimeout(() => storage.save(tasks), delay);
}

export function filterActive(tasks) {
  return tasks.filter((task) => !task.done);
}

export function renameTask(tasks, oldTitle, newTitle) {
  createTask(newTitle);

  return tasks.map((task) =>
    task.title === oldTitle ? { ...task, title: newTitle } : task,
  );
}
