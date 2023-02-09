import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Пример модели с хранением в файле
 */
export default class Task {
  constructor(name, description, count, complexity, completed) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.count = count;
    this.complexity = complexity;
    this.completed = Boolean(completed);
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const filePath = Task.getPathFile();

      fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        }

        resolve(content ? JSON.parse(content) : []);
      });
    });
  }

  static async getById(taskId) {
    const tasks = await Task.getAll();
    const result = tasks.find((t) => t.id === taskId);

    if (!result) {
      throw new Error('Не найдена задача с ID=' + taskId);
    }

    return result;
  }

  static getPathFile() {
    return path.resolve(path.resolve(), './app/data/tasks.json');
  }

  async save() {
    const tasks = await Task.getAll();

    tasks.push({
      id: this.id,
      name: this.name,
      description: this.description,
      count: this.count,
      complexity: this.complexity,
      completed: this.completed,
    });

    return new Promise((resolve, reject) => {
      fs.writeFile(Task.getPathFile(), JSON.stringify(tasks), (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }
}
