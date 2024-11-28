import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { useQueryClient } from "@tanstack/react-query";

export const Entrypoint = () => {
  const {
    visibleCards,
    deletedCards,
    expandedCards,
    setVisibleCards,
    setDeletedCards,
    setExpandedCards,
    deleteCard,
    revertCard,
    toggleExpandCard,
  } = useStore();

  // State
  const [revealDeletedCards, setRevealDeletedCards] = useState(false);

  // Consts
  const queryClient = useQueryClient();
  const listQuery = useGetListData();

  // Use Effects
  useEffect(() => {
    const storedDeletedCards = JSON.parse(
      localStorage.getItem("deletedCards") || "[]"
    );
    const storedExpandedCards = JSON.parse(
      localStorage.getItem("expandedCards") || "[]"
    );
    setDeletedCards(storedDeletedCards);
    setExpandedCards(storedExpandedCards);
  }, [setDeletedCards, setExpandedCards]);

  useEffect(() => {
    localStorage.setItem("deletedCards", JSON.stringify(deletedCards));
  }, [deletedCards]);

  useEffect(() => {
    localStorage.setItem("expandedCards", JSON.stringify(expandedCards));
  }, [expandedCards]);

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading, setVisibleCards]);

  // Handlers
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["list"] });
  };

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => deleteCard(card.id)}
              isExpanded={expandedCards.includes(card.id)}
              onToggleExpand={() => toggleExpandCard(card.id)}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <button
            onClick={handleRevealDeletedCards}
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Reveal
          </button>
          <button
            onClick={handleRefresh}
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {revealDeletedCards &&
            deletedCards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                description=""
                onDelete={() => {}}
                onRevert={() => revertCard(card.id)}
                isExpanded={expandedCards.includes(card.id)}
                onToggleExpand={() => toggleExpandCard(card.id)}
                allowDelete={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
