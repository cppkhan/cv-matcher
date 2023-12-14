# app.py
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import PyPDF2
import pdfplumber
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/match', methods=['POST'])
def match():
    try:
        # Access files from form data
        applicant_cv = request.files['applicantCV']
        job_requirements = request.files['jobRequirements']

        # Process the files (you can use these files with PyPDF2, pdfplumber, etc.)
        # Example: Convert the files to text
        cv_text = extract_text_from_pdf(applicant_cv)
        req_text = extract_text_from_pdf(job_requirements)

        # Perform matching or any other desired processing
        # Example: Calculate similarity using CountVectorizer and cosine similarity
        match_test = [cv_text, req_text]
        cv = CountVectorizer()
        count_matrix = cv.fit_transform(match_test)
        similarity = cosine_similarity(count_matrix)[0][1] * 100
        similarity = round(similarity, 2)

        return jsonify({'similarity': similarity})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def extract_text_from_pdf(pdf_file):
    # Implement logic to extract text from the PDF file
    # You can use PyPDF2, pdfplumber, or any other PDF processing library
    # For example, using pdfplumber:
    with pdfplumber.open(pdf_file) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text

if __name__ == '__main__':
    app.run(debug=True)