import React from 'react'
import Banana from "../../img/banana.png"
import Congo from "../../img/congo.png"
import Criscobutter from "../../img/criscobutter.png"
import Guugle from "../../img/guugle.png"
import Linkedout from "../../img/linkedout.png"
import Salesenergy from "../../img/salesenergy.png"
import Taser from "../../img/taser.png"
import Bookface from "../../img/bookface.png"
import Netflick from "../../img/netflick.png"

export default function Sponsor() {
  return (
<div className="sponsorPage">
    <div className="companySponsors">
        <h1>Company Sponsors</h1>
        <p>Special thanks to our company sponsors Banana, Bookface, Congo, CriscoButter, 
            Guugle, LinkedOut, Netflick, Salesenergy, and Taser. MentorCrowd would not be 
            where it is today without their support. Additionally, if you are interested in 
            becoming a sponsor please be sure to contact us.</p>
    </div>
    <div className="album py-3">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Banana} alt="Banana"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Banana</strong><br /></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Bookface} alt= "Bookface"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Bookface</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Congo} alt = "Congo"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Congo</strong><br /></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Criscobutter} alt = "Criscobutter"/>
                        <div className="card-body">
                            <p className="card-text"><strong>CriscoButter</strong><br /></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Guugle} alt="Guugle"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Guugle</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Linkedout} alt= "Linkedout"/>
                        <div className="card-body">
                            <p className="card-text"><strong>LinkedOut</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Netflick} alt = "Netflick"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Netflick</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Salesenergy} alt = "Salesenergy"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Salesenergy</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img src={Taser} alt= "Taser"/>
                        <div className="card-body">
                            <p className="card-text"><strong>Taser</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <div className="companySponsorsButton">
        <a href="/register.html"><button>Become a Sponsor</button></a>
    </div> */}
    <p className="companyDescription">** DISCLAIMER **<br />All above companies are fictional that were created soley for the sake of this project.</p>
</div>
  )
}
