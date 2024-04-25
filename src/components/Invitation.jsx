import student2 from '../media/student2.png';
import arrow2 from '../media/arrow2.png';
import '../styles/Home.css';

function Invitation() {
  return (
    <div className="invitation-container">
      <div className="invitation-flex">
        <div className="invitation-img">
          <img src={student2} alt="student" className="invitation-student" />
        </div>
        <div className="invitation">
          <h2 className="expert-h2 invitation-h2">Ready to take on the real world?</h2>
          <div className="invitation-imgp">
            <img src={arrow2} alt="arrow" className="invitation-arrow" />
            <p className="invitation-p">
              Join Origin8Lab and equip yourself
              <br />
              with in-demand skills that set you apart in
              <br />
              today&apos;s competitive job market
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invitation;
