import { Search, Filter } from 'lucide-react';

const categories = ['All', 'Personal', 'Work', 'Study', 'Ideas'];

function Toolbar({ category, search, onCategoryChange, onSearchChange }) {
  return (
    <section className="toolbar">
      <div className="toolbar__search-wrap">
        <Search size={15} className="toolbar__search-icon" />
        <input
          type="search"
          className="toolbar__search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes…"
          aria-label="Search notes"
        />
      </div>

      <label className="toolbar__category-wrap">
        <Filter size={14} />
        <select
          className="toolbar__select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default Toolbar;