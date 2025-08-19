import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'movie_project.settings')
django.setup()

from movies.models import Movie, Actor, Director, Genre

# Create additional genres
comedy = Genre.objects.create(name="Comedy")
thriller = Genre.objects.create(name="Thriller")
drama, _ = Genre.objects.get_or_create(name="Drama")
leo, _ = Actor.objects.get_or_create(name="Leonardo DiCaprio", defaults={"age": 49})

# Create additional directors
scorsese = Director.objects.create(name="Martin Scorsese", phone="1122334455")
tarantino = Director.objects.create(name="Quentin Tarantino", phone="5566778899")

# Create additional actors
robert = Actor.objects.create(name="Robert De Niro", age=80)
brad = Actor.objects.create(name="Brad Pitt", age=59)
uma = Actor.objects.create(name="Uma Thurman", age=53)

# Create new movies
m3 = Movie.objects.create(title="The Wolf of Wall Street", release_year=2013, director=scorsese)
m3.actors.add(robert, brad)
m3.genres.add(comedy, drama)

m4 = Movie.objects.create(title="Pulp Fiction", release_year=1994, director=tarantino)
m4.actors.add(uma, brad)
m4.genres.add(thriller, drama)

m5 = Movie.objects.create(title="Shutter Island", release_year=2010, director=scorsese)
m5.actors.add(leo)  # Reusing Leonardo DiCaprio from previous import
m5.genres.add(thriller)

print("Additional sample data populated successfully!")
