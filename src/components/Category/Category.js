import Biceps from "../../pages/Biceps/BicepsPage";
import Forearms from '../../pages/Forearms/ForearmsPage';
import Quadriceps from '../../pages/Quadriceps/QuadricepsPage';

export default function Category() {
    return (
        <>
        <h1>These are all the muscles below</h1>
        <aside className='aside-container'>
        <Biceps />
        &nbsp; &nbsp;
        <Forearms />
        &nbsp; &nbsp;
        <Quadriceps />
        </aside>
        </>
    )
}