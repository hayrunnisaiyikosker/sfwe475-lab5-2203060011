export type Filter = "all" | "done" | "open";

type FilterBarProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  const options: { value: Filter; label: string }[] = [
    { value: "all", label: "All Tasks" },
    { value: "done", label: "Completed Tasks" },
    { value: "open", label: "Pending Tasks" },
  ];

  return (
    <div>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={filter === option.value}
          onClick={() => onFilterChange(option.value)}
          style={{
            fontWeight: filter === option.value ? "bold" : "normal",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
