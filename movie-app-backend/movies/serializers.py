from rest_framework import serializers
from .models import Movie, Actor, Director, Genre

# Nested serializer for movies
class MovieNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'release_year']  # Add other fields if needed

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    movies = MovieNestedSerializer(many=True, read_only=True)  # include movies

    class Meta:
        model = Director
        fields = ['id', 'name', 'movies']  # include movies

class ActorSerializer(serializers.ModelSerializer):
    movies = MovieNestedSerializer(many=True, read_only=True)  # include movies

    class Meta:
        model = Actor
        fields = ['id', 'name', 'movies']  # include movies

class MovieSerializer(serializers.ModelSerializer):
    director = DirectorSerializer(read_only=True)
    actors = ActorSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
