document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems, elems.children);

  // Метод удаления задачи
  const buttons = document.querySelectorAll('button[name="delete-task"]');

  if (buttons?.length > 0) {
    buttons.forEach((btn) =>
      btn.addEventListener('click', function () {
        if (window.confirm('Уверены, что хотите удалить задачу?')) {
          const taskId = this.getAttribute('data-id');
          const csrf = this.getAttribute('data-csrf');

          fetch('/tasks/delete/' + taskId, {
            method: 'DELETE',
            headers: { 'X-CSRF-Token': csrf },
          })
            .then((res) => {
              if (res.ok) {
                window.location.reload();
              }
            })
            .catch((e) => concole.error(e));
        }
      })
    );
  }
});
