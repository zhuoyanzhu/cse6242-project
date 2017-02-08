import csv
import pickle
import pandas as pd
import lda
import cgi
import slurpy
import os
def test(duration, budget, director, actor1, actor2, actor3, movie_facebook_likes, num_critic_for_reviews, 
		num_user_for_reviews, num_voted_users, imdb_score, description, genre) :
	directors = pd.read_csv('directors4db.csv')
	d1 = list(directors.loc[:,'director_name'])
	d2 = list(directors.loc[:,'director_facebook_likes'])
	director_facebook_likes = d2[d1.index(director)]
	
	actors = pd.read_csv('actors4db.csv')
	a1 = list(actors.loc[:,'actor_name'])
	a2 = list(actors.loc[:,'actor_facebook_likes'])
	actor_1_facebook_likes = a2[a1.index(actor1)]
	actor_2_facebook_likes = a2[a1.index(actor2)]
	actor_3_facebook_likes = a2[a1.index(actor3)]
	cast_total_facebook_likes = actor_1_facebook_likes + actor_2_facebook_likes + actor_3_facebook_likes + director_facebook_likes
	
	stat = pd.read_csv('statistics.csv')
	model = pickle.load(open("lda.pkl","rb"))
	dict_ = []
	with open('dictionary.csv', 'r') as csvfile:
		reader = csv.reader(csvfile, delimiter=',', quotechar='|')
		for row in reader:
			dict_ = row


	vec = []
	count = 0
	for i in range(len(dict_)):
		if dict_[i] in description:
			vec += [1]
			count += 1
		else:
			vec += [0]

	movie = dict(zip(dict_, vec))
	movie = pd.DataFrame(movie, index=[0])
	movie = movie.values
	topic = model.transform(movie)

	topic = topic.tolist()[0]


	feature = [
		num_critic_for_reviews,
		duration,
		director_facebook_likes,
		actor_3_facebook_likes,
		actor_1_facebook_likes,
		num_voted_users,
		cast_total_facebook_likes,
		num_user_for_reviews,
		budget,
		actor_2_facebook_likes,
		imdb_score,
		movie_facebook_likes]
	feature += topic


	## test with a training entry
	meaning = pd.read_csv('meaningful.csv')
	binned = pd.read_csv('binned.csv')
	n = 1024
	feature = meaning.loc[n, 'num_critic_for_reviews':'topic29']
	del feature['gross']
	genre = meaning.loc[n, 'Action':'Documentary']
	binned.loc[n, 'gross']

	feature -= stat.loc[0]
	feature /= stat.loc[1]

	feature -= stat.loc[2]
	feature /= stat.loc[3] - stat.loc[2]
	feature *= 2
	feature -= 1.0

	# feature = feature.append(pd.DataFrame(genre)).T
	feature = pd.concat([feature, genre])
	model = pickle.load(open('decision_tree.pkl', 'rb'))
	result = model.predict(feature)
	return feature

s = slurpy.Slurpy()

s.register(os)
s.register(test)

s.start()