import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export function useAuthAndData() {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser({ id: 'anon' });
    setIsAuthReady(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, cliRes, docRes] = await Promise.all([
          supabase.from('productos').select('*'),
          supabase.from('clientes').select('*'),
          supabase.from('documentos').select('*'),
        ]);
        setProductos(prodRes.data || []);
        setClientes(cliRes.data || []);
        setDocumentos(docRes.data || []);
      } catch (e) {
        setError('Error al cargar datos');
      }
    };
    fetchData();
  }, [user]);

  return { user, isAuthReady, error, productos, clientes, documentos };
}
