import { create } from "zustand";

type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  expandedCards: number[];
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  setDeletedCards: (cards: ListItem[]) => void;
  setExpandedCards: (ids: number[]) => void;
  deleteCard: (id: number) => void;
  revertCard: (id: number) => void;
  toggleExpandCard: (id: number) => void;
};

export const useStore = create<State & Actions>((set) => ({
  visibleCards: [],
  deletedCards: [],
  expandedCards: [],
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  setDeletedCards: (cards) => set({ deletedCards: cards }),
  setExpandedCards: (ids) => set({ expandedCards: ids }),
  //   Fnctions:
  deleteCard: (id) =>
    set((state) => {
      const cardToDelete = state.visibleCards.find((item) => item.id === id);
      if (cardToDelete) {
        return {
          visibleCards: state.visibleCards.filter((item) => item.id !== id),
          deletedCards: [...state.deletedCards, cardToDelete],
        };
      }
      return state;
    }),
  revertCard: (id) =>
    set((state) => {
      const cardToRevert = state.deletedCards.find((item) => item.id === id);
      if (cardToRevert) {
        return {
          deletedCards: state.deletedCards.filter((item) => item.id !== id),
          visibleCards: [...state.visibleCards, cardToRevert],
        };
      }
      return state;
    }),
  toggleExpandCard: (id) =>
    set((state) => ({
      expandedCards: state.expandedCards.includes(id)
        ? state.expandedCards.filter((cardId) => cardId !== id)
        : [...state.expandedCards, id],
    })),
}));
