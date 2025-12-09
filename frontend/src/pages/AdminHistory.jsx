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

  const orderIds = [];
  orders.forEach((item) => {
    if (!orderIds.includes(item.orderId)) {
      orderIds.push(item.orderId);
    }
  });

  return (
    <>
      <div className="w-full max-w-full min-h-[calc(100vh-64px-96px)] overflow-x-hidden">
        <h1 className="my-6">Tilaushistoria</h1>

        <div className="flex flex-row gap-2 mb-4 w-full justify-center flex-wrap">
          <button
            className={`px-3 py-1 rounded border ${filter === 'today' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black border-stone-400!'}`}
            onClick={() => handleFilterClick('today')}
          >
            Tämän päivän tilaukset
          </button>
          <button
            className={`px-3 py-1 rounded border ${filter === 'all' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black border-stone-400!'}`}
            onClick={() => handleFilterClick('all')}
          >
            Kaikki tilaukset
          </button>
        </div>

        <div className="w-full flex justify-center">
          <Table className="mt-4 mb-8 max-w-[80vw] mx-auto border border-stone-500">
            <TableHeader className="bg-[#982A2A] text-white">
              <TableRow>
                <TableHead className="text-center">Id</TableHead>
                <TableHead className="text-center">Tuote</TableHead>
                <TableHead className="text-center">Lisätiedot</TableHead>
                <TableHead className="text-center">Määrä</TableHead>
                <TableHead className="text-center">Tilauspäivä</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => {
                const isEven = order.orderId % 2 === 0;

                return (
                  <TableRow
                    key={order.id}
                    className={isEven ? 'bg-[#FFFFFF]' : 'bg-[#982a2a24]'}
                  >
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.details}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <footer className="flex flex-col items-center justify-center bg-[#FFFFFF] w-full h-24 border-t bottom-0 sticky">
        <div className="w-full text-2xl font-bold flex flex-row gap-3 justify-center items-center mb-1">
          <p>Tilauksia yhteensä</p>
          <p>{orderIds.length}</p>
        </div>
      </footer>
    </>
  );
};

export default AdminHistory;
