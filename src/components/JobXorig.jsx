import React from 'react';
import together from '../media/together.png';
import origin8lab from '../media/origin8lab2.png';
import origXjob from '../media/rings.png';
import jobbero from '../media/jobbero.png';
import '../styles/Home.css';

function JobXorig() {
  return (
    <div className="JobXorig-container">
      <div className="JobXorig-flex">
        <div className="JobXorig-img">
          <img src={together} alt="origin8lab" className="JobXorig-together" />
        </div>
        <div className="JobXorig-text">
          <h2 className="JobXorig-h2">
            From Learning to Earning:Origin8Lab & Jobbero Unite!
          </h2>
          <div className="job-rectangle">
            <img
              src={origin8lab}
              alt="JobXoriglab"
              className="JobXorig-img-o"
            />
            <img src={origXjob} alt="JobXorig" className="JobXorig-img-r" />
            <img src={jobbero} alt="JobXorigjob" className="JobXorig-img-j" />
          </div>
          <h2 className="JobXorig-h2">
            Empowering Dreams, Empowering Lives! Our partnership aims to equip
            individuals with essential skills and connect them with exciting job
            opportunities!
          </h2>
        </div>
      </div>
    </div>
  );
}

export default JobXorig;
