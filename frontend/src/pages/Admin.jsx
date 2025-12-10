import EditMenu from './../components/admin/EditMenu';
import AddItem from '../components/admin/AddItem';
import EditItem from './../components/admin/EditItem';
import DeleteItem from '../components/admin/DeleteItem';
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

const Admin = () => {
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [deleteItemOpen, setDeleteItemOpen] = useState(false);

  const {orders, loading, error} = useOrders();
  const {strings} = useLanguage();

  const handleButtonCloseClick = () => {
    setAddItemOpen(false);
    setEditItemOpen(false);
    setDeleteItemOpen(false);
  };

  const handleAddItemClick = () => {
    setAddItemOpen(true);
    setEditItemOpen(false);
    setDeleteItemOpen(false);
  };

  const handleEditItemClick = () => {
    setAddItemOpen(false);
    setEditItemOpen(true);
    setDeleteItemOpen(false);
  };

  const handleDeleteItemClick = () => {
    setAddItemOpen(false);
    setEditItemOpen(false);
    setDeleteItemOpen(true);
  };

  const openOrders = orders.filter((order) => order.status === 'pending');
  if (loading) return <p>{strings.admin.loadingOrders}</p>;
  if (error) return <p>{error}</p>;

  // Get open orders id's to calculate total open orders count
  const openOrderIds = [];
  openOrders.forEach((item) => {
    if (!openOrderIds.includes(item.orderId)) {
      openOrderIds.push(item.orderId);
    }
  });

  return (
    <>
      {/* Fixed min height to push footer to bottom */}
      <div className="w-full min-h-[calc(100vh-64px-208px)] flex flex-col items-center justify-center overflow-x-auto">
        <h1 className="mt-6">{strings.admin.title}</h1>
        <div className="flex flex-row mt-5 items-center justify-center gap-2">
          <h2 className="text-xl">{strings.admin.openOrders}:</h2>
          <p className="font-bold py-2 text-xl">{openOrderIds.length}</p>
        </div>

        <div className="w-[95vw] flex justify-center">
          <Table className="mt-4 mb-8 max-w-[1200px] min-w-[500px] w-full border border-stone-500 table-fixed mx-auto"> {/* mx-auto*/}
            <TableHeader className="bg-[#982A2A] text-white">
              <TableRow>
                <TableHead className="text-center w-1/6">
                  {strings.admin.orderId}
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
                  {strings.admin.done}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {openOrders.map((order) => {
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
                    <TableCell>
                      <input type="checkbox" name="done"></input>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <footer className="flex flex-col items-center justify-center bg-[#FFFFFF] w-full md:h-52 border-t bottom-0 sticky">
        <div className="w-full md:mb-6 max-md:mt-5 text-2xl md:text-3xl font-bold">
          <h2 className='max-md:mb-2'>{strings.admin.editMenu}</h2>
        </div>

        <EditMenu
          addItemClick={handleAddItemClick}
          editItemClick={handleEditItemClick}
          deleteItemClick={handleDeleteItemClick}
        />
      </footer>
      {addItemOpen && <AddItem onClose={handleButtonCloseClick} />}

      {editItemOpen && <EditItem onClose={handleButtonCloseClick} />}

      {deleteItemOpen && <DeleteItem onClose={handleButtonCloseClick} />}
    </>
  );
};

export default Admin;
