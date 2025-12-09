import ShowCards from '../ShowCards';
import HighlightCard from '../HighlightCard';
import {useLanguage} from '../../../hooks/useLanguage';

function Mains() {
  const {strings} = useLanguage();
  return (
    <>
      <h1>{strings.menu.mains}</h1>
      <HighlightCard></HighlightCard>
      <ShowCards category_id={2}></ShowCards>
    </>
  );
}

export default Mains;
