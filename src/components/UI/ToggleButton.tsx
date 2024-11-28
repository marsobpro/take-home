type ToggleButtonProps = {
  isToggled: boolean;
  onToggle: () => void;
  onLabel?: string;
  offLabel?: string;
  disabled: boolean;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled,
  onToggle,
  onLabel = "On",
  offLabel = "Off",
  disabled = false,
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 hover:opacity-70 duration-150 cursor-pointer disabled:opacity-40"
    >
      {isToggled ? onLabel : offLabel}
    </button>
  );
};
