import nltk
#nltk.download()
from nltk import word_tokenize
from nltk import FreqDist
from nltk.corpus import stopwords

file = open('titles.txt', 'r')
corpus = file.read()
corpus = corpus.decode('utf-8')

print(len(corpus))
tokens = word_tokenize(corpus)
filtered_words = [word for word in tokens if word not in stopwords.words('english')]
#print(tokens)
fdist = FreqDist(filtered_words)
print(fdist.most_common(200))
