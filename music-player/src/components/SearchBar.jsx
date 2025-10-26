function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <div className="flex items-center bg-slate-800 rounded-lg p-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for lofi tracks..."
        className="flex-grow bg-transparent outline-none text-white px-2"
      />
      <button
        onClick={onSearch}
        disabled={loading}
        className="px-4 py-2 bg-emerald-400 text-slate-900 font-bold rounded-lg hover:opacity-80 transition disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
}

export default SearchBar;
