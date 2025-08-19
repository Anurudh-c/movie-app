from django.test import TestCase
from movies.models import Movie, Actor, Director, Genre

class ModelsTestCase(TestCase):
    def setUp(self):
        self.director = Director.objects.create(name="Christopher Nolan")
        self.actor = Actor.objects.create(name="Leonardo DiCaprio")
        self.genre = Genre.objects.create(name="Action")
        self.movie = Movie.objects.create(title="Inception", release_year=2010, director=self.director)
        self.movie.genres.add(self.genre)
        self.movie.actors.add(self.actor)

    def test_movie_creation(self):
        self.assertEqual(self.movie.title, "Inception")
        self.assertEqual(self.movie.release_year, 2010)
        self.assertEqual(self.movie.director.name, "Christopher Nolan")
        self.assertIn(self.genre, self.movie.genres.all())
        self.assertIn(self.actor, self.movie.actors.all())

    def test_actor_movies_relationship(self):
        self.assertIn(self.movie, self.actor.movies.all())

    def test_director_movies_relationship(self):
        self.assertIn(self.movie, self.director.movies.all())
