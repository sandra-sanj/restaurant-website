import {useOrderContext} from '../../hooks/contextHook';
import OrderedItem from './OrderedItem';
import {useLanguage} from '../../hooks/useLanguage';

const Confirmation = () => {
  const {orderResult} = useOrderContext();

  const {strings} = useLanguage();

  //console.log(orderResult);
  return (
    <>
      {orderResult && (
        <div className="m-7 outline-2 outline-stone-500 rounded-md w-[300px] xs:w-[350px] sm:w-[450px]">
          <div className='border-b border-stone-400 pb-3 bg-red-50'>
            <h1 className="text-2xl! font-semibold mb-3 px-2 sm:text-3xl! py-4 pt-6">
              {strings.cart?.thankYou || 'Kiitos tilauksesta!'}{' '}
            </h1>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row gap-2 justify-center'>
              <p>
                {strings.admin?.orderId || 'Tilauksen id'}:
              </p>
              <p>{orderResult.order_id}</p>
              </div>
              <p>{orderResult.order_type}</p>
              <p>{strings.cart?.payment || 'Maksu'}</p>
            </div>
          </div>

          <div>
            <div className='pl-1 pr-4 flex flex-col py-3 sm:pr-10! sm:pl-5!'>
              <h2 className="font-semibold text-lg pt-5 pb-2">
                {strings.cart?.products || 'Tuotteet'}:{' '}
              </h2>
              {orderResult.items.map((item) => (
                <OrderedItem
                  key={item.order_item_id}
                  item={item}
                  className="flex justify-between items-center border-b py-0! bg-blue-100!"
                />
              ))}
              <p></p>
            </div>
            
            <div className="flex flex-col gap-1 p-4 bg-red-50 border-t border-stone-400">

              <p className="font-semibold">
                {strings.cart?.total || 'Yhteensä'}:
              </p>
              <p className='font-bold'>{orderResult.total_price} €</p>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Confirmation;
