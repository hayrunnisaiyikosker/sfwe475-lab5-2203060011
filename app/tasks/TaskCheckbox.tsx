type TaskCheckboxProps = {
  done: boolean;
  onToggle: () => void;
  taskTitle: string;
};

function TaskCheckbox({
  done,
  onToggle,
  taskTitle,
}: TaskCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={done}
      onChange={onToggle}
      aria-label={
        done
          ? `Mark ${taskTitle} as pending`
          : `Mark ${taskTitle} as completed`
      }
    />
  );
}

export default TaskCheckbox;
