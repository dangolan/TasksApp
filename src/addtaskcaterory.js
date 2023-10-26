import { useState } from 'react';


function TaskForm({cateroryFromUser}) {
  const [category, setCategory] = useState(cateroryFromUser);

  const handleCategorySelect = (event) => {
    const category = event.target.textContent;
    setCategory(category);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        id="task-category-input"
        name="category"
        className="form-control"
        aria-label="Text input with dropdown button"
        placeholder="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      />
     <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="dropdown-item" href="#" onClick={handleCategorySelect}>
            Work
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={handleCategorySelect}>
          Family
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={handleCategorySelect}>
          Studies
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={handleCategorySelect}>
          Arrangements
          </a>
        </li>
      </ul>
    </div>
  );
}

export default TaskForm;