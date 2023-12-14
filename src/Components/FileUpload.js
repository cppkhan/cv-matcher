// // src/FileUpload.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [cvFile, setCvFile] = useState(null);
//   const [reqFile, setReqFile] = useState(null);
//   const [similarity, setSimilarity] = useState(null);

//   const handleCvChange = (event) => {
//     console.log(event.target.files[0]);
//     setCvFile(event.target.files[0]);
//   };

//   const handleReqChange = (event) => {
//     setReqFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     // const formData = new FormData();
//     // formData.append('cvText', cvFile);
//     // formData.append('reqText', reqFile);
//     var data={cvText:cvFile,reqText:reqFile}
//     data=JSON.stringify(data)
//  console.log(">>>>>>>>>.formDataformDataformData",data);
//     try {
//       const response = await axios.post('http://localhost:5000/analyze', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSimilarity(response.data.similarity);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={(event)=>handleCvChange(event)} />
//       <input type="file" onChange={(event)=>handleReqChange(event)} />
//       <button onClick={()=>handleUpload()}>Upload and Analyze</button>

//       {similarity !== null && (
//         <div>
//           <h2>Similarity:</h2>
//           <p>{similarity}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [jobRequirements, setJobRequirements] = useState(null);
    const [applicantCV, setApplicantCV] = useState(null);
    const [result, setResult] = useState('');

    const handleJobRequirementsChange = (e) => {
        setJobRequirements(e.target.files[0]);
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
        <div className="App">
            <div>
                <label>Job Requirements (PDF only):</label>
                <input type="file" accept=".pdf" onChange={handleJobRequirementsChange} />
            </div>
            <div>
                <label>Applicant CV (PDF only):</label>
                <input type="file" accept=".pdf" onChange={handleApplicantCVChange} />
            </div>
            <button onClick={handleUpload}>Match Data</button>
            <div>Matching Result: {result}</div>
        </div>
    );
}

export default FileUpload;
