import {useLanguage} from '../../hooks/useLanguage';

const OrderedItem = (props) => {
  const {item} = props;
  const {strings} = useLanguage();

  return (
    <>
      {item && (
        <div className="mb-2 flex flex-row gap-5 py-2">
          <div className="flex flex-col min-w-[200px] text-left justify-center">
            <p className="pl-5">{item.item_name}</p>
            <p className="pl-5">
              {item.quantity} {strings.cart?.pieces || 'kpl'}
            </p>
          </div>
          <div className="flex flex-row w-full gap-2 items-center justify-end">
            <div className="flex items-center gap-1">
              <span>{item.unit_price} €</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderedItem;
