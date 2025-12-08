import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const API_URL = import.meta.env.VITE_API_URL;

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {

      try {
        setLoading(true);

        const options = {
          method: 'GET',
        };

        const ordersRes = await fetchData(`${API_URL}/orders`, options);
        
        const ordersWithItems = await Promise.all(
          ordersRes.map(async (order) => {
            const itemsRes = await fetchData(`${API_URL}/orders/${order.order_id}/details`, { method: 'GET' });
            return itemsRes.order_items.map(item => ({
              id: order.order_id,
              customer: order.customer_name,
              date: order.created_at.split(' ')[0],
              product: item.item_name,
              quantity: item.quantity,
              details: `Protein: ${item.selected_protein || 'N/A'}, Spice: ${item.selected_spice_level || 'N/A'}, ${item.special_requests || ''}`,
            }));
          })
        );

        setOrders(ordersWithItems.flat());
        setError(null);
      } catch (e) {
        console.error('Error fetching orders:', e);
        setError('Error fetching orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return { orders, loading, error };
}

export { useOrders };
