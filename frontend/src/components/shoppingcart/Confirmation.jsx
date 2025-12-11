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
        <div className="m-7 outline-2 outline-stone-500 rounded-md w-[500px]">
          <div>
            <h1 className="text-lg" id='thank-you'>
              {strings.cart?.thankYou || 'Kiitos tilauksesta!'}{' '}
            </h1>
            <div>
              <p>
                {strings.admin?.orderId || 'Tilauksen id'}:
                {orderResult.order_id}
              </p>
              <p>{orderResult.order_type}</p>
              <p>{strings.cart?.payment || 'Maksu'}</p>
            </div>
          </div>

          <div>
            <p>
              {strings.admin?.orderId || 'Tilauksen id'}:{orderResult.order_id}
            </p>
            <p>{orderResult.order_type}</p>
            <p>{strings.cart?.payment || 'Maksu'}</p>

            <div>
              <h2 className="font-semibold text-lg">
                {strings.cart?.products || 'Tuotteet'}:{' '}
              </h2>
              {orderResult.items.map((item) => (
                <OrderedItem
                  key={item.order_item_id}
                  item={item}
                  className="flex justify-between items-center border-b py-2"
                />
              ))}
              <p></p>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-red-50 border-t border-stone-400">
              <p>{orderResult.total_price} €</p>

              <p className="font-semibold">
                {strings.cart?.total || 'Yhteensä'}: €
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Confirmation;
