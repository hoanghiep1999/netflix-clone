import '../assets/css/FixedBtn.css';
import arrow from '../assets/svg/arrow-up-solid.svg';

export default function FixedButton () {
  return <div className="fixed-btn" onClick={() => { window.scrollTo({top: 0, behavior: "smooth"}) }}><img src={arrow} alt="" width="20" /></div>
}