const helpers = {
  isCompleted(t) {
    return t?.completed ? 'checked' : '';
  },
  getAction(t) {
    return t?.id ? 'update' : 'add';
  },
  complexityTask(t) {
    return t.completed ? 'check' : 'close';
  },
  getClassOfComplexity() {
    switch (this.complexity) {
      case 'easy':
        return 'green accent-3';

      case 'medium':
        return 'yellow accent-3';

      case 'hard':
        return 'deep-orange accent-3';

      default:
        throw new Error(`Не удалось определить сложность (${this.complexity})`);
    }
  },
  issetTasks(t) {
    return Array.isArray(t) && t.length > 0;
  },
};

export default helpers;
