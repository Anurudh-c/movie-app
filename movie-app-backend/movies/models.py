from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)   # new simple field

    def __str__(self):
        return self.name


class Director(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True)  # new simple field

    def __str__(self):
        return self.name


class Actor(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(null=True, blank=True)  # new simple field

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=200)
    release_year = models.IntegerField()
    description = models.TextField(blank=True)   # new simple field
    director = models.ForeignKey(Director, related_name='movies', on_delete=models.SET_NULL, null=True)
    genres = models.ManyToManyField(Genre, related_name='movies')
    actors = models.ManyToManyField(Actor, related_name='movies')

    def __str__(self):
        return self.title
