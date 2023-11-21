import pandas as pd
import scipy.sparse as sp
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_data():
    org_data = pd.read_csv('datasets/orgs_v3.csv')
#     org_data['name'] = org_data['name'].str.lower()
    return org_data

def combine_data(data):
    drop_cols = ['id', 'domain', 'status', 'email','phone', 'countrycode', 
        'statecode', 'city', 'address', 'description','employeeCount', 'foundedOn', 
        'founders', 'homepageUrl', 'linkedin','facebook', 'name', 'numFundingrounds', 
        'people', 'revenuerange','totalFundingUsd', 'password']
    data_recommend = data.drop(columns=drop_cols)
    data_recommend['combine'] = data_recommend[data_recommend.columns[0:2]].apply(
                                     lambda x: ','.join(x.dropna().astype(str)),axis=1)
        
    data_recommend = data_recommend.drop(columns=[ 'categoryList', 'categorygrpList'])
    return data_recommend

def transform_data(data_combine, data_descr):
        count = CountVectorizer(stop_words='english')
        count_matrix = count.fit_transform(data_combine['combine'])

        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(data_descr['description'])

        combine_sparse = sp.hstack([count_matrix, tfidf_matrix], format='csr')
        cosine_sim = cosine_similarity(combine_sparse, combine_sparse)
        
        return cosine_sim

def recommend_companies(company_id, data, combine, transform):
        indices = pd.Series(data.index, index = data['id'])
        index = indices[company_id]

        sim_scores = list(enumerate(transform[index]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]

        company_indices = [i[0] for i in sim_scores]

        uid = data['id'].iloc[company_indices]
        domain = data['domain'].iloc[company_indices]
        status = data['status'].iloc[company_indices]
        category = data['categoryList'].iloc[company_indices]
        email = data['email'].iloc[company_indices]
        phone = data['phone'].iloc[company_indices]
        ctrycode = data['countrycode'].iloc[company_indices]
        statecode = data['statecode'].iloc[company_indices]
        city = data['city'].iloc[company_indices]
        address = data['address'].iloc[company_indices]
        description = data['description'].iloc[company_indices]
        employee_count = data['employeeCount'].iloc[company_indices]
        founded_on = data['foundedOn'].iloc[company_indices]
        founder = data['founders'].iloc[company_indices]
        homepage_url = data['homepageUrl'].iloc[company_indices]
        facebook_url = data['facebook'].iloc[company_indices]
        linkedin_url = data['linkedin'].iloc[company_indices]
        name = data['name'].iloc[company_indices]
        num_funding_rounds = data['numFundingrounds'].iloc[company_indices]
        password = data['password'].iloc[company_indices]
        people = data['people'].iloc[company_indices]
        revenue_range = data['revenuerange'].iloc[company_indices]
        totalFundingUsd = data['totalFundingUsd'].iloc[company_indices]
        
        recommendation_data = pd.DataFrame()
        
        recommendation_data['id'] = uid
        recommendation_data['domain'] = domain
        recommendation_data['status'] = status
        recommendation_data['CL_d'] = category            
        recommendation_data['email_d'] =  email
        recommendation_data['phone_d'] = phone
        recommendation_data['ctrycode_d'] = ctrycode
        recommendation_data['statecode_d'] = statecode
        recommendation_data['city_d'] = city
        recommendation_data['address_d'] = address
        recommendation_data['description'] = description
        recommendation_data['employeeCount'] = employee_count
        recommendation_data['foundedOn'] = founded_on
        recommendation_data['found_d'] = founder
        recommendation_data['homepageUrl'] = homepage_url
        recommendation_data['linked_d'] = linkedin_url
        recommendation_data['face_d'] = facebook_url     
        recommendation_data['name'] = name 
        recommendation_data['numFundingRounds'] = num_funding_rounds
        recommendation_data['password'] = password
        recommendation_data['people_d'] = people
        recommendation_data['revenueRange'] = revenue_range
        recommendation_data['totalFundingUsd'] = totalFundingUsd
        
        recommendation_data['CL_d'] = recommendation_data['CL_d'].str.split(',')
        recommendation_data['found_d'] = recommendation_data['found_d'].str.split(',')
        recommendation_data['people_d'] = recommendation_data['people_d'].str.split(',')
        
        
        
        recommendation_data_list = recommendation_data.to_dict('records')
        
        # array for category List
        ctg_list = []
        get_ctg = list(recommendation_data.CL_d.values)
        for n in range(len(get_ctg)):
            di = {}
            for i in range(len(get_ctg[n])): 
                di[i] = get_ctg[n][i]
                ctg_list.append(di)

        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['CategoryList'] = ctg_list[n]
            

        # array for contact
        phone_list = list(recommendation_data.phone_d.values)
        email_list = list(recommendation_data.email_d.values)
        ctrycode_list = list(recommendation_data.ctrycode_d.values)
        state_list = list(recommendation_data.statecode_d.values)
        city_list = list(recommendation_data.city_d.values)
        address_list = list(recommendation_data.address_d.values)
        
        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['contact'] = {'email':email_list[n],'phone' : phone_list[n],
                                                'countryCode': ctrycode_list[n], 'stateCode': state_list[n],
                                                'city': city_list[n], 'address': address_list[n]}
            
        # array for founder List
        founder_list = []
        get_founder = list(recommendation_data.found_d.values)
        for n in range(len(get_founder)):
            di = {}
            for i in range(len(get_founder[n])): 
                di[i] = get_founder[n][i]
                founder_list.append(di)

        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['founders'] = founder_list[n]
            
        # array for people List
        people_list = []
        get_people = list(recommendation_data.people_d.values)
        for n in range(len(get_people)):
            di = {}
            for i in range(len(get_people[n])): 
                di[i] = get_people[n][i]
                people_list.append(di)

        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['people'] = people_list[n]
            
        # array for links 
        facebook_list = list(recommendation_data.face_d.values)
        linkedin_list = list(recommendation_data.linked_d.values)
        
        for n in range(len(recommendation_data_list)):
            recommendation_data_list[n]['links'] = {'0':facebook_list[n],'1' : linkedin_list[n]}
            
        drop_list = ['CL_d','email_d','phone_d','ctrycode_d','statecode_d','city_d','address_d','found_d','linked_d',
                    'face_d','people_d']    
        for comp in range(len(recommendation_data_list)):
            for n in drop_list:
                del recommendation_data_list[comp][n]
            
                    
        return recommendation_data_list

def results(company_id):
        # company_name = company_name.lower()

        find_company = get_data()
        combine_result = combine_data(find_company)
        transform_result = transform_data(combine_result,find_company)

        if company_id not in find_company['id'].unique():
                return 'Company not in Database'

        else:
                recommendations = recommend_companies(company_id, find_company, combine_result, transform_result)
                return recommendations
