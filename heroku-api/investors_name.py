import pandas as pd
import scipy.sparse as sp
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_invtypea():
    inv_data = pd.read_csv('datasets/investors_data.csv')
    inv_data['name'] = inv_data['name'].str.lower()
    return inv_data

def combine_data(data):
    drop_cols = ['uuid', 'name', 'partners', 'tot_funding', 'address',
       'linkedin', 'domain', 'description', 'invested_companies']
    data_recommend = data.drop(columns=drop_cols)
    data_recommend['combine'] = data_recommend[data_recommend.columns[0:2]].apply(
                                     lambda x: ','.join(x.dropna().astype(str)),axis=1)
        
    data_recommend = data_recommend.drop(columns=[ 'type', 'investment_type'])
    return data_recommend

def transform_data(data_combine, data_descr):
        count = CountVectorizer(stop_words='english')
        count_matrix = count.fit_transform(data_combine['combine'])

        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(data_descr['description'])

        combine_sparse = sp.hstack([count_matrix, tfidf_matrix], format='csr')
        cosine_sim = cosine_similarity(combine_sparse, combine_sparse)
        
        return cosine_sim

def recommend_investors(investor_name, data, combine, transform):
        indices = pd.Series(data.index, index = data['name'])
        index = indices[investor_name]

        sim_scores = list(enumerate(transform[index]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]

        investor_indices = [i[0] for i in sim_scores]

        uuid = data['uuid'].iloc[investor_indices]
        name = data['name'].iloc[investor_indices]
        description = data['description'].iloc[investor_indices]
        cb = data['domain'].iloc[investor_indices]
        total_funding = data['tot_funding'].iloc[investor_indices]
        address = data['address'].iloc[investor_indices]
        partners = data['partners'].iloc[investor_indices]
        linkedin_url = data['linkedin'].iloc[investor_indices]
        invested_companies = data['invested_companies'].iloc[investor_indices]
        investor_type = data['type'].iloc[investor_indices]
        investment_type = data['investment_type'].iloc[investor_indices]

        recommendation_data = pd.DataFrame()

        recommendation_data['id'] = uuid
        recommendation_data['name'] = name
        recommendation_data['description'] = description
        recommendation_data['cb_d'] = cb
        recommendation_data['password'] = "fundgalaxy123"
        recommendation_data['totalFunding'] = total_funding
        recommendation_data['companiesInvestedIn_d'] = invested_companies
        recommendation_data['investerType'] = investor_type
        recommendation_data['contact'] = address
        recommendation_data['linked_d'] = linkedin_url
        recommendation_data['investmentDomains_d'] = investment_type

        recommendation_data['investmentDomains_d'] = recommendation_data['investmentDomains_d'].str.split(',')
        recommendation_data['companiesInvestedIn_d'] = recommendation_data['companiesInvestedIn_d'].str.split('-')

        recommendation_data_list = recommendation_data.to_dict('records')
        
        # array for investor domain List
        invtype_list = []
        get_invtype = list(recommendation_data.investmentDomains_d.values)
        for n in range(len(get_invtype)):
            di = {}
            for i in range(len(get_invtype[n])): 
                di[i] = get_invtype[n][i]
                invtype_list.append(di)

        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['investmentDomains'] = invtype_list[n]

        # array for companies invested List
        invcomp_list = []
        get_invcomp = list(recommendation_data.companiesInvestedIn_d.values)
        for n in range(len(get_invcomp)):
            di = {}
            for i in range(len(get_invcomp[n])): 
                di[i] = get_invcomp[n][i]
                invcomp_list.append(di)

        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['companiesInvestedIn'] = invcomp_list[n]
            
        # array for links    
        cb_list = list(recommendation_data.cb_d.values)
        linkedin_list = list(recommendation_data.linked_d.values)
        
        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['links'] = {'0':cb_list[n],'1' : linkedin_list[n]}

        drop_list = ['investmentDomains_d','linked_d','cb_d','companiesInvestedIn_d']    
        for comp in range(len(recommendation_data_list)):
            for n in drop_list:
                del recommendation_data_list[comp][n]

        return recommendation_data_list

def results(investor_name):
        investor_name = investor_name.lower()

        find_investor = get_invtypea()
        combine_result = combine_data(find_investor)
        transform_result = transform_data(combine_result,find_investor)

        if investor_name not in find_investor['name'].unique():
                return 'investor not in Database'

        else:
                recommendations = recommend_investors(investor_name, find_investor, combine_result, transform_result)
                return recommendations