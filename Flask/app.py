from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return(
        f'Available Routes: <br/>'
        f'/api/salary<br/>'
        f'/api/jobinfo<br/>'
        f'/api/words<br/>'
    )

@app.route("/api/salary")
def salary():
    """Returns junior data analyst salary information"""
    with open('../Resources/salary.json') as f:
        salary_data = json.load(f)

    response = jsonify(salary_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/jobinfo")
def jobInfo():
    """Returns job title, company, location, estimated salary, and link to post"""
    with open('../Resources/jobinfo.json') as f:
        job_data = json.load(f)
    
    response = jsonify(job_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/words")
def words():
    """Returns job title, word counts"""
    with open('../Resources/words.json', encoding='utf-8') as f:
        word_data = json.load(f)
    
    response = jsonify(word_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)