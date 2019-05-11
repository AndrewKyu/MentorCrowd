import React from 'react'
import Andrew from '../../img/Andrew.jpg';
import Cindy from '../../img/Cindy.jpg';
import Stephen from '../../img/Stephen.jpg';

export default function About() {
  return (
    <div className="aboutPage mt-3">
      <div className="row">
        <h1>About MentorCrowd</h1>
          <p>MentorCrowd is a social media web application geared towards mentorship. Our goal
          is to help connect individuals with desire to learn new skills or to receive advice. 
          To achieve this is we set up a  platform to allow these individuals to connect 
          with eachother and share their skills and experiences.  
        </p>
        <h1>The Team</h1>
      </div>
        <div className="row">
            <div className="col-lg-3 col-md-3">
              <img src={Andrew} className="mb-3" style={{width: '150px'}}/>
          </div>
          <div className="col-lg-8 col-md-8">
            <p>Andrew is currently a senior at San Jose State University, pursuing a degree in Computer Engineering. His role within this project was to work as the backend engineer, working with tools such as Node Js, Express Js, and MongoDB. After graduation, he hopes to pursue a career in fullstack web development.</p>
            <p>On his free time, Andrew likes to spend his days either trying out new, hip restuarants, traveling, or even spending the day at home watching Netflix. He recently became a huge Game of Thrones fan, so he's always up for theory debates on the show!</p>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-3 col-md-3">
              <img src={Cindy} className="mb-3" style={{width: '150px'}}/>
          </div>
          <div className="col-lg-8 col-md-8">
            <p>Cindy is on her last year at San Jose State University studying Computer Engineering. Her role in this project was to work as the frontend engineer using HTML5, CSS3, JavaScript, React.js, Bootstrap, etc. After graduation, she will be joining Aruba, a Hewlett Packard Enterprise company as a Jr. Web Developer.</p>
            <p>When Cindy isn't at school, she likes to binge her favorite shows on Netflix, plan her next trip, and eat ice cream.</p>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-3 col-md-3">
              <img src={Stephen} className="mb-3" style={{width: '150px'}}/>
          </div>
          <div className="col-lg-8 col-md-8">
            <p>Stephen is a graduating senior from San Jose State University majoring in Computer Engineering. Stephen's primary role for this project was the matching algorithm which decided when to recommend users to one another. The primary tool used for this was text-miner package which alloowed the generation and manipulaltion of a document term matrix.</p>
            <p>Outside of his studies Stephen enjoys participating in intramural sports with his fraternity and playing video games with his friends.</p>
          </div>
        </div>
    </div>
  )
}
