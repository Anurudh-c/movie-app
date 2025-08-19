from django.test import TestCase
from movies.models import Movie, Actor, Director, Genre
from movies.serializers import MovieSerializer, ActorSerializer

class SerializerTestCase(TestCase):
    def setUp(self):
        self.director = Director.objects.create(name="Christopher Nolan")
        self.actor = Actor.objects.create(name="Leonardo DiCaprio")
        self.genre = Genre.objects.create(name="Action")
        self.movie = Movie.objects.create(title="Inception", release_year=2010, director=self.director)
        self.movie.genres.add(self.genre)
        self.movie.actors.add(self.actor)

    def test_movie_serializer(self):
        serializer = MovieSerializer(self.movie)
        data = serializer.data
        self.assertEqual(data['title'], "Inception")
        self.assertEqual(data['director']['name'], "Christopher Nolan")
        self.assertEqual(len(data['genres']), 1)
        self.assertEqual(len(data['actors']), 1)
