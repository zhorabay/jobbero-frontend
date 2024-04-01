import partner1 from '../media/partner1.png';
import partner2 from '../media/partner2.png';
import partner3 from '../media/partner3.png';
import partner4 from '../media/partner4.png';
import partner5 from '../media/partner5.png';
import '../styles/Home.css';

function Partners() {
  return (
    <div className="expert-container">
      <div className="partners-flex">
        <div className="invitation">
          <h2 className="expert-h2">Our Educational Partners</h2>
        </div>
        <div className="partners-img">
          <img src={partner1} alt="partner" className="partners-partner" />
          <img src={partner2} alt="partner" className="partners-partner" />
          <img src={partner3} alt="partner" className="partners-partner-3" />
          <img src={partner4} alt="partner" className="partners-partner" />
          <img src={partner5} alt="partner" className="partners-partner" />
        </div>
      </div>
    </div>
  );
}

export default Partners;
