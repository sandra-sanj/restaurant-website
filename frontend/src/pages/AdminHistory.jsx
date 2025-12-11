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
import {useLanguage} from '../hooks/useLanguage';

const AdminHistory = () => {
  const [filter, setFilter] = useState('today');
  const {orders, loading, error} = useOrders();
  const {strings} = useLanguage();

  const handleFilterClick = (type) => {
    setFilter(type);
  };

  const getToday = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    return date + '.' + month + '.' + year;
  };

  const todayStr = getToday();

  const filteredOrders = orders.filter((order) => {
    if (filter === 'today') {
      return order.date === todayStr; // Today's orders
    } else {
      return true; // All orders
    }
  });

  const orderIds = [];
  filteredOrders.forEach((item) => {
    if (!orderIds.includes(item.orderId)) {
      orderIds.push(item.orderId);
    }
  });

  return (
    <>
      <div className="w-full min-h-[calc(100vh-64px-96px)] overflow-x-auto flex flex-col items-center justify-center">
        <h1 className="my-6">{strings.admin.history}</h1>

        <div className="flex flex-col w-1/2 min-w-[300px] items-center mx-auto md:flex-row gap-2 md:mb-4 md:w-full justify-center flex-wrap max-md:gap-0">
          <button
            className={`px-3 py-1 rounded border ${filter === 'today' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black border-stone-400!'}`}
            onClick={() => handleFilterClick('today')}
          >
            {strings.admin.todayOrders}
          </button>
          <button
            className={`px-3 py-1 rounded border ${filter === 'all' ? 'bg-[#2A4B11]! text-white' : 'bg-white text-black border-stone-400!'}`}
            onClick={() => handleFilterClick('all')}
          >
            {strings.admin.allOrders}
          </button>
        </div>

        <div className="w-[95vw] flex justify-center">

          {filteredOrders.length > 0 ? (

          <Table className="mt-4 mb-8 max-w-[1200px] min-w-[500px] w-full border border-stone-500 table-fixed mx-auto">
            <TableHeader className="bg-[#982A2A] text-white">
              <TableRow>
                <TableHead className="text-center w-1/6">
                  {strings.admin.id}
                </TableHead>
                <TableHead className="text-center w-2/6">
                  {strings.admin.product}
                </TableHead>
                <TableHead className="text-center w-2/6">
                  {strings.admin.details}
                </TableHead>
                <TableHead className="text-center w-1/6">
                  {strings.admin.quantity}
                </TableHead>
                <TableHead className="text-center w-1/6">
                  {strings.admin.orderDate}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => {
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
          ) : (
            <p className='p-5 font-semibold text-red-700'>Ei tilauksia / No orders</p>
          )}
        </div>
      </div>

      <footer className="flex flex-col items-center justify-center bg-[#FFFFFF] w-full h-24 border-t bottom-0 sticky">
        <div className="w-full text-2xl font-bold flex flex-row gap-3 justify-center items-center mb-1">
          <p>{strings.admin.totalOrders}</p>
          <p>{orderIds.length}</p>
        </div>
      </footer>
    </>
  );
};

export default AdminHistory;
