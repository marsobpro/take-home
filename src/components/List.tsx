import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  onDelete: () => void;
};

export const Card: FC<CardProps> = ({ title, description, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={handleToggleExpand}>
            {/* {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />} */}
            <ChevronDownIcon
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </ExpandButton>
          <DeleteButton onClick={onDelete} />
        </div>
      </div>
      <div className={`card-content ${isExpanded ? "expanded" : ""}`}>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
