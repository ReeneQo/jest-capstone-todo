import {
  createTask,
  // раскомментируйте по мере реализации:
  // toggleTask,
  // addTask,
  // removeTask,
  // findTask,
  // countActive,
  // summarizeTasks,
  // loadTasks,
  // scheduleAutosave,
} from "./todo";

// ============================================================
// ОБРАЗЕЦ: так тестируется createTask. Повторите приём для остальных.
// ============================================================
describe("createTask", () => {
  test("создаёт активную задачу", () => {
    expect(createTask("Хлеб")).toEqual({ title: "Хлеб", done: false });
  });

  test.each([[""], [null], [undefined]])(
    "бросает ошибку на входе %p",
    (bad) => {
      expect(() => createTask(bad)).toThrow("Название задачи обязательно");
    }
  );
});

// ============================================================
// ВАША РАБОТА. Пишите по TDD: сначала красный тест, потом код в todo.js.
// Подсказки — какие техники где применить:
//
// toggleTask      → toEqual + проверка иммутабельности (исходная задача не изменилась)
// addTask         → toEqual на новый массив
// removeTask      → toEqual на массив без удалённой
// findTask        → toBeDefined / toBeUndefined
// countActive     → toBe(число); проверьте пустой и смешанный список
// summarizeTasks  → toMatchSnapshot
// loadTasks       → мок api (jest.fn().mockResolvedValue), await, toHaveBeenCalledTimes;
//                   ошибка сети: mockRejectedValue + rejects.toThrow
// scheduleAutosave→ jest.useFakeTimers(); not.toHaveBeenCalled() до прокрутки;
//                   advanceTimersByTime; toHaveBeenCalledWith; useRealTimers() в afterEach;
//                   отдельно проверьте задержку ПО УМОЛЧАНИЮ (вызов без delay) — иначе
//                   ветка default-параметра останется непокрытой!
// ============================================================
