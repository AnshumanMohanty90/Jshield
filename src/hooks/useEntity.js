import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

// Reusable hook for entity CRUD + realtime subscriptions.
export function useEntity(entityName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await base44.entities[entityName].list("-updated_date", 200);
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  useEffect(() => {
    load();
    const unsub = base44.entities[entityName].subscribe(() => load());
    return unsub;
  }, [entityName, load]);

  const create = async (data) => {
    await base44.entities[entityName].create(data);
  };
  const update = async (id, data) => {
    await base44.entities[entityName].update(id, data);
  };
  const remove = async (id) => {
    await base44.entities[entityName].delete(id);
  };

  return { items, loading, reload: load, create, update, remove };
}