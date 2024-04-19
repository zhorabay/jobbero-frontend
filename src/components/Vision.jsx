import africa from '../media/africa.png';
import sun from '../media/sun.png';
import '../styles/Home.css';

function Vision() {
  return (
    <div className="vision-container">
      <div className="vision-flex">
        <div className="vision">
          <h2 className="vision-h2">Our Vision</h2>
          <p className="vision-p">At Origin8Lab, we envision a future where every African youth has the opportunity to unlock their full potential and thrive in the modern job market. By offering comprehensive skill acquisition programs in technology, personal development, and beyond, we empower individuals to bridge the unemployment gap and pursue fulfilling careers. Powered by Jobbero, our platform provides holistic support, equipping graduates with the tools they need to succeed in their job s earch and elevate their career aspirations.</p>
        </div>
        <div className="vision-imgs">
          <img src={africa} alt="africa" className="vision-africa" />
          <img src={sun} alt="sun" className="vision-sun" />
        </div>
      </div>
    </div>
  );
}

export default Vision;
