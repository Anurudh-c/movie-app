from rest_framework.test import APITestCase
from rest_framework import status
from movies.models import Movie, Actor, Director, Genre
from django.urls import reverse

class APITestSetup(APITestCase):
    def setUp(self):
        self.director = Director.objects.create(name="Christopher Nolan")
        self.actor = Actor.objects.create(name="Leonardo DiCaprio")
        self.genre = Genre.objects.create(name="Action")
        self.movie = Movie.objects.create(title="Inception", release_year=2010, director=self.director)
        self.movie.genres.add(self.genre)
        self.movie.actors.add(self.actor)

class MovieAPITest(APITestSetup):
    def test_movie_list(self):
        url = reverse('movie-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Inception")

    def test_movie_detail(self):
        url = reverse('movie-detail', args=[self.movie.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Inception")

class ActorAPITest(APITestSetup):
    def test_actor_list(self):
        url = reverse('actor-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], "Leonardo DiCaprio")

class DirectorAPITest(APITestSetup):
    def test_director_list(self):
        url = reverse('director-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], "Christopher Nolan")
