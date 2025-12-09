import ShowCards from '../ShowCards';
import HighlightCard from '../HighlightCard';
import {useLanguage} from '../../../hooks/useLanguage';

function All() {
  const {strings} = useLanguage();
  return (
    <>
      <h1>{strings.menu.all}</h1>
      <HighlightCard></HighlightCard>
      <ShowCards></ShowCards>
    </>
  );
}
export default All;
