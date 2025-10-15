// Hook para autenticación anónima y manejo de datos con Supabase
import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';

export function useAuthAndData() {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [error, setError] = useState(null);

  // Autenticación anónima
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
        setIsAuthReady(true);
      } else {
        // Iniciar sesión anónima
        const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
        if (anonData?.user) {
          setUser(anonData.user);
        } else {
          setError(anonError?.message || 'Error de autenticación');
        }
        setIsAuthReady(true);
      }
    };
    getSession();
  }, []);

  // Cargar datos de tablas
  useEffect(() => {
    if (!user) return;
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
