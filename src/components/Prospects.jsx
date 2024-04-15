import { useNavigate } from 'react-router-dom';
import education from '../media/education.png';
import instructor from '../media/instructor.png';
import Live from '../media/Live.png';
import Quality from '../media/Quality.png';
import Student from '../media/Student.png';
import '../styles/Home.css';

function Prospects() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/all-courses');
  };

  return (
    <div className="prospects-container">
      <div className="prospects">
        <div>
          <h2 className="prosp-h2">Elevate Your Job Prospects: Discover Why Origin8Lab Reigns Supreme in Employment-Oriented Skill Development!</h2>
          <button type="button" className="prosp-btn" onClick={handleClick}>Start Now</button>
        </div>
        <div className="prosp-grid">
          <div className="card-0" />
          <div className="card">
            <img src={instructor} alt="instructor" className="card-img-1" />
            <h4 className="card-h4">Best Instructors</h4>
            <p className="card-p">Our online courses are led by industry-leading instructors, dedicated to empowering learners with the skills they need to succeed</p>
          </div>
          <div className="card">
            <img src={education} alt="education" className="card-img-2" />
            <h4 className="card-h4">Best Curriculum</h4>
            <p className="card-p">Experience the pinnacle of education featuring the best curriculum meticulously crafted to meet industry need and learner aspirations.</p>
          </div>
          <div className="card">
            <img src={Quality} alt="Quality" className="card-img-3" />
            <h4 className="card-h4">Certificate</h4>
            <p className="card-p">Earn a certificate globally recognized by employers, validating your expertise and open doors to opportunities worldwide</p>
          </div>
          <div className="card">
            <img src={Live} alt="Live" className="card-img-4" />
            <h4 className="card-h4">Live Classes</h4>
            <p className="card-p">Join our online course website for the best live classes, tailored to fit your schedule and learning pace, ensuring convenience</p>
          </div>
          <div className="card">
            <img src={Student} alt="Student" className="card-img-5" />
            <h4 className="card-h4">Happy Students</h4>
            <p className="card-p-5">Origin8Lab proudly boasts a track record of happy and successful students, equipped with the skills and knowledge to thrive in their careers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prospects;
