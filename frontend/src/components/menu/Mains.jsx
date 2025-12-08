import ShowCards from './ShowCards';
import HighlightCard from './HighlightCard';

function Mains() {
    return (
        <>
            <h1>Mains</h1>
            <HighlightCard></HighlightCard>
            <ShowCards category_id={2} ></ShowCards>
        </>
    )
}

export default Mains;