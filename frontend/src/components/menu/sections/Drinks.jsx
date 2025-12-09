import ShowCards from '../ShowCards';
import {useLanguage} from '../../../hooks/useLanguage';

function Drinks() {
  const {strings} = useLanguage();

  return (
    <>
      <h1>{strings.menu.drinks}</h1>
      <ShowCards category_id={4}></ShowCards>
    </>
  );
}
export default Drinks;
