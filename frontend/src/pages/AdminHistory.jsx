import {useState} from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import {useOrders} from '../hooks/orderHook';

const AdminHistory = () => {
  const [filter, setFilter] = useState('today');
  const {orders, loading, error} = useOrders();

  const handleFilterClick = (type) => {
    setFilter(type);
  };

  return (
    <>
      <h1>Tilaushistoria</h1>

      <div className="flex flex-row gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded border ${filter === 'today' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black'}`}
          onClick={() => handleFilterClick('today')}
        >
          Tämän päivän tilaukset
        </button>
        <button
          className={`px-3 py-1 rounded border ${filter === 'all' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black'}`}
          onClick={() => handleFilterClick('all')}
        >
          Kaikki tilaukset
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Tuote</TableHead>
            <TableHead className="text-center">Lisätiedot</TableHead>
            <TableHead className="text-center">Määrä</TableHead>
            <TableHead className="text-center">Tilauspäivä</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <br />
      <footer>
        <p>Tilauksia yhteensä {orders.length}</p>
      </footer>
    </>
  );
};

export default AdminHistory;
