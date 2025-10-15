import { useState } from 'react';
import { supabase } from './supabaseClient';

export function useSupabaseActions() {
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const performAction = async (table, action, data = null, id = null) => {
    setLoading(true);
    setActionError(null);
    try {
      if (action === 'add') {
        const { error } = await supabase.from(table).insert([data]);
        if (error) throw error;
      } else if (action === 'update' && id) {
        const { error } = await supabase.from(table).update(data).eq('id', id);
        if (error) throw error;
      } else if (action === 'delete' && id) {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) throw error;
      } else {
        throw new Error('Acción o parámetros no válidos.');
      }
      return true;
    } catch (e) {
      setActionError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, actionError, performAction };
}
