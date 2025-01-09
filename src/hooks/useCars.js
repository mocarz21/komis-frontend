import { useQuery } from '../OdevFetch/useQuery';
import { returnFetch } from '../OdevFetch/returnFetch';

/**
 * useCars - Hook do obsługi zasobu /cars.
 * @param {number} [carId] - opcjonalny parametr. 
 *        Jeśli podasz carId, hook pobierze dane wyłącznie o tym jednym samochodzie (GET /cars/{carId}).
 *        Jeśli nie podasz, pobiera całą listę (GET /cars).
 *
 * Zwraca obiekt:
 *  - loading: boolean, czy trwa ładowanie
 *  - payload: (lista samochodów lub pojedynczy obiekt samochodu)
 *  - refetch: funkcja do ponownego wywołania zapytania GET
 *  - save: funkcja do wysłania danych nowego lub aktualizowanego samochodu (POST / PUT)
 *  - remove: funkcja do usunięcia samochodu (DELETE)
 */
export const useCars = (carId) => {
  // Ustal endpoint – jeśli jest carId, pobieramy jeden samochód, inaczej listę
  const endpoint = carId ? `cars/${carId}` : 'cars';

  // Używamy naszego customowego hooka do zapytania GET
  const { loading, payload, refetch } = useQuery({ endpoint });

  /**
   * save - funkcja do tworzenia lub aktualizacji samochodu.
   * Przyjmuje obiekt "body" z danymi samochodu, np.:
   * {
   *   id: 10,               // jeśli istnieje, zrobimy PUT /cars/10
   *   brand: "Ford",
   *   model: "Focus",
   *   production_year: 2018,
   *   ...
   * }
   */
  const save = async (body) => {
    // Jeśli mamy id w body, wykonujemy PUT na /cars/:id
    // Jeśli nie mamy id, wykonujemy POST na /cars
    const method = body.id ? 'PUT' : 'POST';
    const saveEndpoint = body.id ? `cars/${body.id}` : 'cars';

    const data = await returnFetch({
      endpoint: saveEndpoint,
      method,
      body, // to, co wysyłasz do backendu
    });
    return data;
  };

  /**
   * remove - funkcja do usuwania samochodu.
   * Przyjmuje obiekt { id }, z którego pobiera id do /cars/:id
   */
  const remove = async ({ id }) => {
    const data = await returnFetch({
      endpoint: `cars/${id}`,
      method: 'DELETE',
    });
    return data;
  };

  return {
    loading,   // czy trwa ładowanie z GET-a
    payload,   // wynik zapytania GET (lista lub pojedynczy obiekt)
    refetch,   // funkcja do ponownego pobrania
    save,      // tworzenie/aktualizowanie
    remove,    // usuwanie
  };
};
