import {
  createTask,
  toggleTask,
  addTask,
  removeTask,
  findTask,
  countActive,
  summarizeTasks,
  loadTasks,
  scheduleAutosave,
  filterActive,
  renameTask,
} from "./todo";

describe("createTask", () => {
  test("создаёт активную задачу", () => {
    expect(createTask("Хлеб")).toEqual({ title: "Хлеб", done: false });
  });

  test.each([[""], [null], [undefined]])(
    "бросает ошибку на входе %p",
    (bad) => {
      expect(() => createTask(bad)).toThrow("Название задачи обязательно");
    },
  );
});

describe("toggleTask", () => {
  test("возвращает копию задачи с инвертированным done", () => {
    const task = { title: "Хлеб", done: false };

    const result = toggleTask(task);

    expect(result).toEqual({ title: "Хлеб", done: true });
    expect(result).not.toBe(task);
    expect(task).toEqual({ title: "Хлеб", done: false });
  });
});

describe("addTask", () => {
  test("добавляет задачу, не изменяя исходный массив", () => {
    const tasks = [{ title: "Хлеб", done: false }];

    const result = addTask(tasks, "Молоко");

    expect(result).toEqual([
      { title: "Хлеб", done: false },
      { title: "Молоко", done: false },
    ]);
    expect(result).not.toBe(tasks);
    expect(tasks).toEqual([{ title: "Хлеб", done: false }]);
  });
});

describe("removeTask", () => {
  test("удаляет задачу, не изменяя исходный массив", () => {
    const tasks = [
      { title: "Хлеб", done: false },
      { title: "Молоко", done: true },
    ];

    const result = removeTask(tasks, "Хлеб");

    expect(result).toEqual([{ title: "Молоко", done: true }]);
    expect(result).not.toBe(tasks);
    expect(tasks).toEqual([
      { title: "Хлеб", done: false },
      { title: "Молоко", done: true },
    ]);
  });
});

describe("findTask", () => {
  const tasks = [{ title: "Хлеб", done: false }];

  test("возвращает найденную задачу", () => {
    expect(findTask(tasks, "Хлеб")).toBe(tasks[0]);
  });

  test("возвращает undefined, если задачи нет", () => {
    expect(findTask(tasks, "Молоко")).toBeUndefined();
  });
});

describe("countActive", () => {
  test("возвращает 0 для пустого списка", () => {
    expect(countActive([])).toBe(0);
  });

  test("считает только невыполненные задачи", () => {
    const tasks = [
      { title: "Хлеб", done: false },
      { title: "Молоко", done: true },
      { title: "Чай", done: false },
    ];

    expect(countActive(tasks)).toBe(2);
  });
});

describe("summarizeTasks", () => {
  test("возвращает сводку по задачам", () => {
    const tasks = [
      { title: "Хлеб", done: false },
      { title: "Молоко", done: true },
    ];

    expect(summarizeTasks(tasks)).toMatchSnapshot();
  });
});

describe("loadTasks", () => {
  test("загружает названия и создаёт задачи", async () => {
    const api = {
      fetchTitles: jest.fn().mockResolvedValue(["Хлеб", "Молоко"]),
    };

    const result = await loadTasks(api);

    expect(api.fetchTitles).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      { title: "Хлеб", done: false },
      { title: "Молоко", done: false },
    ]);
  });

  test("пробрасывает ошибку сети", async () => {
    const api = {
      fetchTitles: jest.fn().mockRejectedValue(new Error("Сеть недоступна")),
    };

    await expect(loadTasks(api)).rejects.toThrow("Сеть недоступна");
    expect(api.fetchTitles).toHaveBeenCalledTimes(1);
  });
});

describe("scheduleAutosave", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("сохраняет задачи после указанной задержки", () => {
    const storage = { save: jest.fn() };
    const tasks = [{ title: "Хлеб", done: false }];

    const timerId = scheduleAutosave(storage, tasks, 500);

    expect(timerId).toBeDefined();
    expect(storage.save).not.toHaveBeenCalled();
    jest.advanceTimersByTime(499);
    expect(storage.save).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(storage.save).toHaveBeenCalledWith(tasks);
  });

  test("использует задержку 1000 мс по умолчанию", () => {
    const storage = { save: jest.fn() };
    const tasks = [];

    scheduleAutosave(storage, tasks);

    jest.advanceTimersByTime(999);
    expect(storage.save).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(storage.save).toHaveBeenCalledWith(tasks);
  });
});

describe("filterActive", () => {
  test("возвращает только активные задачи", () => {
    const tasks = [
      { title: "Хлеб", done: false },
      { title: "Молоко", done: true },
    ];

    expect(filterActive(tasks)).toEqual([{ title: "Хлеб", done: false }]);
    expect(tasks).toHaveLength(2);
  });
});

describe("renameTask", () => {
  test("переименовывает задачу, сохраняя статус и исходные данные", () => {
    const tasks = [{ title: "Хлеб", done: true }];

    const result = renameTask(tasks, "Хлеб", "Бородинский");

    expect(result).toEqual([{ title: "Бородинский", done: true }]);
    expect(tasks).toEqual([{ title: "Хлеб", done: true }]);
  });

  test("оставляет остальные задачи без изменений", () => {
    const tasks = [{ title: "Молоко", done: false }];

    expect(renameTask(tasks, "Хлеб", "Бородинский")).toEqual(tasks);
  });
});
