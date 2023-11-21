from flask import Flask,request,jsonify
from flask_cors import CORS
import organizations_name, investors_name, organizations_ID, investors_ID

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def recommendations():
        return jsonify({'FundGalaxy' : 'GET Recommendations'})
        
@app.route('/companyname', methods=['GET'])
def recommend_company_name():
        res = organizations_name.results(request.args.get('cname'))
        return jsonify(res)

@app.route('/investorname', methods=['GET'])
def recommend_investor_name():
        res = investors_name.results(request.args.get('iname'))
        return jsonify(res)

@app.route('/companyid', methods=['GET'])
def recommend_company_id():
        res = organizations_ID.results(request.args.get('cid'))
        return jsonify(res)

@app.route('/investorid', methods=['GET'])
def recommend_investor_id():
        res = investors_ID.results(request.args.get('iid'))
        return jsonify(res)

if __name__=='__main__':
        app.run(port = 5000, debug = True)