from __future__ import print_function
import numpy as np
import pandas as pd
import nltk
import re
import os
import codecs
from sklearn import feature_extraction
import mpld3
import json




# here I define a tokenizer and stemmer which returns the set of stems in the text that it is passed

def tokenize_and_stem(text):
    # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
    tokens = [word for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    stems = [stemmer.stem(t) for t in filtered_tokens]
    return stems


def tokenize_only(text):
    # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
    tokens = [word.lower() for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    return filtered_tokens


with open('data.json') as data_file:    
    data = json.load(data_file)




#titles = ['The Godfather', 'The Shawshank Redemption', 'Schindlers List', 'Raging Bull', 'Casablanca', 'One Flew Over the Cuckoos Nest', 'Gone with the Wind', 'Citizen Kane','The Wizard of Oz', 'Titanic','Lawrence of Arabia', 'The Godfather: Part II', 'Psycho', 'Sunset Blvd.', 'Vertigo', 'On the Waterfront', 'Forrest Gump', 'The Sound of Music','West Side Story', 'Star Wars']
titles = []

fileTitles = open('titles.txt', 'r')
for line in fileTitles:
	line = line.rstrip() 
	if line:
		titles.append(line)

print(titles)

#f = open('synopses_list_imdb.txt', 'r')
f = open('abstracts_keywords.txt', 'r')
synopses = []
#n=0

for line in f:
	#n=n+1
	line = line.rstrip() 
	if line:
		if line !=' BREAKS HERE':
			synopses.append(line)
			#print "line "+str(n)+" -> "+line

#print titles[:10]
#print synopses[0][:200]

# load nltk's English stopwords as variable called 'stopwords'
stopwords = nltk.corpus.stopwords.words('english')
#print stopwords[:10]

# load nltk's SnowballStemmer as variabled 'stemmer'
from nltk.stem.snowball import SnowballStemmer
stemmer = SnowballStemmer("english")


#not super pythonic, no, not at all.
#use extend so it's a big flat list of vocab
totalvocab_stemmed = []
totalvocab_tokenized = []
for i in synopses:
    allwords_stemmed = tokenize_and_stem(i) #for each item in 'synopses', tokenize/stem
    totalvocab_stemmed.extend(allwords_stemmed) #extend the 'totalvocab_stemmed' list
    
    allwords_tokenized = tokenize_only(i)
    totalvocab_tokenized.extend(allwords_tokenized)



vocab_frame = pd.DataFrame({'words': totalvocab_tokenized}, index = totalvocab_stemmed)
#print 'there are ' + str(vocab_frame.shape[0]) + ' items in vocab_frame'


#print vocab_frame.head()
print
print
print
print



from sklearn.feature_extraction.text import TfidfVectorizer

print(len(synopses))
print(len(titles))

#define vectorizer parameters
tfidf_vectorizer = TfidfVectorizer(max_df=0.8, max_features=200000,
                                 min_df=0.2, stop_words='english',
                                 use_idf=True, tokenizer=tokenize_and_stem, ngram_range=(1,3))

tfidf_matrix = tfidf_vectorizer.fit_transform(synopses) #fit the vectorizer to synopses

print(tfidf_matrix.shape)

terms = tfidf_vectorizer.get_feature_names()

from sklearn.metrics.pairwise import cosine_similarity
dist = 1 - cosine_similarity(tfidf_matrix)
print
print




from sklearn.cluster import KMeans

num_clusters = 10

km = KMeans(n_clusters=num_clusters)

km.fit(tfidf_matrix)

clusters = km.labels_.tolist()

print(clusters)
print(len(clusters))




from sklearn.externals import joblib

#uncomment the below to save your model 
#since I've already run my model I am loading from the pickle

#joblib.dump(km,  'doc_cluster.pkl')

#km = joblib.load('doc_cluster.pkl')
#clusters = km.labels_.tolist()


films = { 'title': titles, 'synopsis': synopses, 'cluster': clusters}
frame = pd.DataFrame(films, index = [clusters] , columns = ['title', 'cluster'])
print (frame['cluster'].value_counts()) #number of films per cluster (clusters from 0 to 4)



print("Top terms per cluster:")
print()
#sort cluster centers by proximity to centroid
order_centroids = km.cluster_centers_.argsort()[:, ::-1] 

for i in range(num_clusters):
    print("Cluster %d words:" % i, end='')
    
    for ind in order_centroids[i, :6]: #replace 6 with n words per cluster
        print(' %s' % vocab_frame.ix[terms[ind].split(' ')].values.tolist()[0][0].encode('utf-8', 'ignore'), end=',')
    print() #add whitespace
    print() #add whitespace
    
    #print("Cluster %d titles:" % i, end='')
    #for title in frame.ix[i]['title'].values.tolist():
    #    print(' %s,' % title, end='')
    #print() #add whitespace
    #print() #add whitespace
    
print()
print()


import matplotlib.pyplot as plt
import matplotlib as mpl

from sklearn.manifold import MDS

MDS()

# convert two components as we're plotting points in a two-dimensional plane
# "precomputed" because we provide a distance matrix
# we will also specify `random_state` so the plot is reproducible.
mds = MDS(n_components=2, dissimilarity="precomputed", random_state=1)

pos = mds.fit_transform(dist)  # shape (n_components, n_samples)

xs, ys = pos[:, 0], pos[:, 1]
print()
print()



#set up colors per clusters using a dict
cluster_colors = {0: '#a6cee3', 1: '#1f78b4', 2: '#b2df8a', 3: '#33a02c', 4: '#fb9a99', 5: '#e31a1c', 6: '#fdbf6f', 7: '#ff7f00', 8: '#cab2d6', 9: '#6a3d9a'}

#set up cluster names using a dict
cluster_names = {0: '1', 
                 1: '2', 
                 2: '3', 
                 3: '4', 
                 4: '5',
                 5: '6',
                 6: '7', 
                 7: '8', 
                 8: '9', 
                 9: '10'}


#some ipython magic to show the matplotlib plots inline
#%matplotlib inline 

#create data frame that has the result of the MDS plus the cluster numbers and titles
df = pd.DataFrame(dict(x=xs, y=ys, label=clusters, title=titles)) 

#group by cluster
groups = df.groupby('label')


# set up plot
fig, ax = plt.subplots(figsize=(17, 9)) # set size
ax.margins(0.05) # Optional, just adds 5% padding to the autoscaling

#iterate through groups to layer the plot
#note that I use the cluster_name and cluster_color dicts with the 'name' lookup to return the appropriate color/label
for name, group in groups:
    ax.plot(group.x, group.y, marker='o', linestyle='', ms=12, 
            label=cluster_names[name], color=cluster_colors[name], 
            mec='none')
    ax.set_aspect('auto')
    ax.tick_params(\
        axis= 'x',          # changes apply to the x-axis
        which='both',      # both major and minor ticks are affected
        bottom='off',      # ticks along the bottom edge are off
        top='off',         # ticks along the top edge are off
        labelbottom='off')
    ax.tick_params(\
        axis= 'y',         # changes apply to the y-axis
        which='both',      # both major and minor ticks are affected
        left='off',      # ticks along the bottom edge are off
        top='off',         # ticks along the top edge are off
        labelleft='off')
    
ax.legend(numpoints=1)  #show legend with only 1 point

#add label in x,y position with the label as the film title
for i in range(len(df)):
    ax.text(df.ix[i]['x'], df.ix[i]['y'], df.ix[i]['title'], size=8)  

    
    
plt.show() #show the plot

#uncomment the below to save the plot if need be
#plt.savefig('clusters_small_noaxes.png', dpi=200)


#strip any proper names from a text...unfortunately right now this is yanking the first word from a sentence too.
# import string
# def strip_proppers(text):
#     # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
#     tokens = [word for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent) if word.islower()]
#     return "".join([" "+i if not i.startswith("'") and i not in string.punctuation else i for i in tokens]).strip()

# #strip any proper nouns (NNP) or plural proper nouns (NNPS) from a text
# from nltk.tag import pos_tag

# def strip_proppers_POS(text):
#     tagged = pos_tag(text.split()) #use NLTK's part of speech tagger
#     non_propernouns = [word for word,pos in tagged if pos != 'NNP' and pos != 'NNPS']
#     return non_propernouns

# from gensim import corpora, models, similarities 

# #remove proper names
# preprocess = [strip_proppers(doc) for doc in synopses]

# #tokenize
# tokenized_text = [tokenize_and_stem(text) for text in preprocess]

# #remove stop words
# texts = [[word for word in text if word not in stopwords] for text in tokenized_text]

# #create a Gensim dictionary from the texts
# dictionary = corpora.Dictionary(texts)

# #remove extremes (similar to the min/max df step used when creating the tf-idf matrix)
# dictionary.filter_extremes(no_below=1, no_above=0.8)

# #convert the dictionary to a bag of words corpus for reference
# corpus = [dictionary.doc2bow(text) for text in texts]

# lda = models.LdaModel(corpus, num_topics=5, 
#                             id2word=dictionary, 
#                             update_every=5, 
#                             chunksize=10000, 
#                             passes=100)


# lda.show_topics()
