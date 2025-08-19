from rest_framework import viewsets, filters
from .models import Movie, Actor, Director, Genre
from .serializers import MovieSerializer, ActorSerializer, DirectorSerializer, GenreSerializer
from django_filters.rest_framework import DjangoFilterBackend

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['release_year', 'director', 'genres', 'actors']


class ActorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Actor.objects.prefetch_related('movies').all()
    serializer_class = ActorSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'movies__title', 'movies__genres__name']
    ordering_fields = ['name']


class DirectorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Director.objects.prefetch_related('movies').all()
    serializer_class = DirectorSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'movies__title', 'movies__genres__name']
    ordering_fields = ['name']


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
