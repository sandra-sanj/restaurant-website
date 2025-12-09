import ShowCards from './ShowCards';
import {useLanguage} from '../../hooks/useLanguage';

function Desserts() {
  const {strings} = useLanguage();
  return (
    <>
      <h1>{strings.menu.desserts}</h1>
      <ShowCards category_id={3}></ShowCards>
    </>
  );
}
export default Desserts;
