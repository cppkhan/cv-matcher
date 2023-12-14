// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'
import CircularProgressBar from './CircularProgressBar';
function FileUpload() {
    const [jobRequirements, setJobRequirements] = useState(null);
    const [applicantCV, setApplicantCV] = useState(null);
    const [result, setResult] = useState('');

    const handleJobRequirementsChange = (e) => {
        setJobRequirements(e.target.files[0]);
        console.log(">>>>>>>>>>>>>>",e.target.files[0]);
    };

    const handleApplicantCVChange = (e) => {
        setApplicantCV(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('jobRequirements', jobRequirements);
        formData.append('applicantCV', applicantCV);

        axios.post('http://localhost:5000/match', formData)
            .then(response => {
              console.log(response.data.similarity);
                setResult(response.data.similarity);
            })
            .catch(error => {
                console.error('Error:', error);
                setResult('Error occurred during matching.');
            });
    };

    return (
     <div className="FileStyle">
             <div>
                <label htmlFor="jobRequirements" style={{textAlign:'center',  padding: '10px', cursor: 'pointer' }} className='TabStyle'>Job Requirements (PDF only)</label>
                <input
                    id="jobRequirements"
                    type="file"
                    accept=".pdf"
                    onChange={handleJobRequirementsChange}
                    style={{ display: 'none' }}
                />
                <div className='text-Style'>Uploaded Requirement : {jobRequirements?jobRequirements.name:''}</div>
            </div>
         <div>
                <label htmlFor="applicantCV"  style={{textAlign:'center',  padding: '10px', cursor: 'pointer' }} className='TabStyle'>Applicant CV (PDF only)</label>
                <input
                    id="applicantCV"
                    type="file"
                    accept=".pdf"
                    onChange={handleApplicantCVChange}
                    style={{ display: 'none' }}
                />
                 <div  className='text-Style'>Uploaded CV : {applicantCV?applicantCV.name:''}</div>
            </div>
            <button className='match_Button' onClick={handleUpload} >Match Data</button>
            <div className='result_css'>
            <div  className='text-Style' > Matching Result: {result}</div>
             <CircularProgressBar percentage={result} />
             </div>
        </div>
    );
}

export default FileUpload;
