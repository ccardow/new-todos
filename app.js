const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');

const li = document.querySelectorAll('li span');

const search = document.querySelector('.search input');

if (localStorage.length) {
  list.insertAdjacentHTML(
    'beforeend',

    `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  <span contenteditable="true">${localStorage}</span>
  <i class="far fa-trash-alt delete"></i>
</li>

  `
  );

  const localItems = Object.values(localStorage);

  list.innerHTML = localItems
    .map(function (item) {
      return (
        '<li class="list-group-item d-flex justify-content-between align-items-center">' +
        '<span contenteditable="true">' +
        item +
        '</span>' +
        '<i class="far fa-trash-alt delete">' +
        '</i>' +
        '</li>'
      );
    })
    .join('');
}

const generateTemplate = (todo) => {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  <span contenteditable="true">${todo}</span>
  <i class="far fa-trash-alt delete"></i>
</li>
  `;

  list.innerHTML += html;
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const todo = addForm.add.value.trim();
  const addTodo = {
    key: todo,
    value: todo,
  };

  if (todo.length) {
    generateTemplate(todo);
    localStorage.setItem(todo, todo);
    addForm.reset();
    addForm.focus();
  }
});

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

//Because querySelectorAll returns a node list, it returns an error on addEventListener and so convert to array with forEach
Array.prototype.forEach.call(li, (e) => {
  e.addEventListener('keypress', (e) => {
    if (e.keyCode == 10 || e.keyCode == 13) {
      {
        e.preventDefault();
      }
    }
  });
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
