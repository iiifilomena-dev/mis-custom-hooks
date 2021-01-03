import { useState, useEffect, useRef } from 'react';

export const useFetch = ( url ) => {

    // Cuando se llama a useRef por defecto el componente se 
    // encuentra montado porque se está renderizando la primera vez
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });
                
        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                if (isMounted.current)
                {
                    setState({
                        data,
                        loading: false,
                        error: null
                    })
                }
                else
                {
                    console.log('setState no ha sido llamado. Evitó generar errores...')
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })

    }, [url]);

    return state;

}
