import { FC, useCallback, useMemo, useState } from "react";
import { ListItem } from "../../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  onDelete: () => void;
  onRevert?: () => void;
  allowDelete?: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export const Card: FC<CardProps> = ({
  title,
  description,
  onDelete,
  onRevert,
  allowDelete = true,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsDeleting(true);
      setTimeout(onDelete, 300);
    },
    [onDelete]
  );

  const handleRevert = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsDeleting(true);
      if (onRevert) {
        setTimeout(onRevert, 300);
      }
    },
    [onRevert]
  );

  const iconClassName = useMemo(
    () =>
      `transform transition-transform duration-300 ${
        isExpanded ? "rotate-180" : "rotate-0"
      }`,
    [isExpanded]
  );

  const cardClassName = useMemo(
    () =>
      `border border-gray-300 rounded-md px-2 py-1.5 
    transition-all duration-400 cursor-pointer hover:border-gray-700
    transition-colors duration-150
    ${isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"}`,
    [isDeleting]
  );

  return (
    <div className={cardClassName} onClick={onToggleExpand}>
      <div className="flex justify-between mb-0.5">
        <h3 className="font-medium">{title}</h3>

        {/* Action Buttons */}
        <div className="flex">
          {description && (
            <ExpandButton>
              <ChevronDownIcon className={iconClassName} />
            </ExpandButton>
          )}
          {allowDelete ? (
            <DeleteButton onClick={handleDelete} />
          ) : (
            <DeleteButton onClick={handleRevert} />
          )}
        </div>
      </div>

      {/* Description / Expanding part */}
      <div className={`card-content ${isExpanded ? "expanded" : ""}`}>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
