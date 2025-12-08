import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const API_URL = import.meta.env.VITE_API_URL;

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem('token');

      try {
        setLoading(true);
        const options = {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };

        const ordersRes = await fetchData(`${API_URL}/orders`, options);

        const ordersWithItems = await Promise.all(
          ordersRes.map(async (order) => {
            const itemsRes = await fetchData(
              `${API_URL}/orders/${order.order_id}/details`,
              {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            },
            );

            return itemsRes.items.map((item) => ({
              id: item.order_item_id,
              orderId: order.order_id,
              customer: order.customer_name,
              date: new Date(order.created_at).toLocaleDateString('fi-FI'),
              product: item.item_name,
              quantity: item.quantity,
              //details: `Proteiini: ${item.selected_protein || '-'}, Tulisuus: ${item.selected_spice_level || '-'}, ${item.special_requests || ''}`,
              details: `${item.special_requests || '-'}`,
              status: order.order_status,
            }));
          }),
        );

        setOrders(ordersWithItems.flat());
        setError(null);
      } catch (e) {
        console.error('Error fetching orders:', e);
        setError('Tilauksien haku epäonnistui');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return {orders, loading, error};
}

export {useOrders};
