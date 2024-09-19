import './App.scss';
import Brain from '../Brain'
import desertImage from '../../assets/images/earth/desert.png';

export default function App() {
    return (
        <section className='app__sky'>
            <div className='app__header'>
                <h1 arial-label="Andrew Miculka" className='app__header__name'>
                    <span className='app__header__name__text'>Andrew Miculka</span>
                </h1>
            </div>
            <img className='app__desert' src={desertImage} />
            <Brain />
        </section>
    )
}
