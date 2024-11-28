import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store/store";

import { Card } from "./UI/Card";
import { Spinner } from "./UI/Spinner";
import { ToggleButton } from "./UI/ToggleButton";

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

  // Visible Cards List

  const visibleCardsList = useMemo(
    () =>
      visibleCards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          onDelete={() => deleteCard(card.id)}
          isExpanded={expandedCards.includes(card.id)}
          onToggleExpand={() => toggleExpandCard(card.id)}
        />
      )),
    [visibleCards, expandedCards, deleteCard, toggleExpandCard]
  );

  // Deleted Cards
  const deletedCardsList = useMemo(
    () =>
      revealDeletedCards
        ? deletedCards.map((card) => (
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
          ))
        : null,
    [
      deletedCards,
      revealDeletedCards,
      expandedCards,
      revertCard,
      toggleExpandCard,
    ]
  );

  // Loading
  if (listQuery.isLoading) {
    return (
      <div className="relative top-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex gap-x-16 w-[90%] h-full justify-center align-top">
      {/* Awesome List */}
      <div className="flex-1 max-w-xl ">
        <h2 className="mb-8 font-bold text-2xl">
          My Awesome List ({visibleCards.length})
        </h2>
        <div className="flex flex-col gap-y-3 max-h-[80%] overflow-scroll">
          {visibleCardsList}
        </div>
      </div>

      {/* Deleted Cards / Reveal / Refresh header */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center justify-between mb-8 ">
          <h2 className="font-bold text-2xl">
            Deleted Cards ({deletedCards.length})
          </h2>
          <div className="flex gap-4 ml-auto">
            <ToggleButton
              isToggled={revealDeletedCards}
              onToggle={() => setRevealDeletedCards(!revealDeletedCards)}
              onLabel="Hide"
              offLabel="Reveal"
              disabled={deletedCards.length === 0}
            />

            <button
              onClick={handleRefresh}
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 hover:opacity-70 duration-150 cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Deleted Cards list */}
        <div className="flex flex-col gap-y-3 max-h-[80%] overflow-scroll">
          {deletedCardsList}
        </div>
      </div>
    </div>
  );
};
