import ShowCards from '../ShowCards';
import {useLanguage} from '../../../hooks/useLanguage';

function Snacks() {
  const {strings} = useLanguage();
  return (
    <>
      <h1>{strings.menu.snacks}</h1>
      <ShowCards category_id={1}></ShowCards>
    </>
  );
}
export default Snacks;
