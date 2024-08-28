import { Relationship } from '../types';
import { StoreApi } from 'zustand';

interface RelationshipState {
  relationships: Relationship[];
}

export const relationshipsActions = (set: StoreApi<RelationshipState>['setState']) => ({
  addRelationship: (relationship: Relationship) =>
    set((state: RelationshipState) => ({
      relationships: [...state.relationships, relationship],
    })),

  updateRelationship: (index: number, relationship: Relationship) =>
    set((state: RelationshipState) => ({
      relationships: state.relationships.map((r, i) =>
        i === index ? relationship : r
      ),
    })),

  deleteRelationship: (index: number) =>
    set((state: RelationshipState) => ({
      relationships: state.relationships.filter((_, i) => i !== index),
    })),
});
