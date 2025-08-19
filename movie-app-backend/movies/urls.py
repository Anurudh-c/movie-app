from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, ActorViewSet, DirectorViewSet, GenreViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'actors', ActorViewSet)
router.register(r'directors', DirectorViewSet)
router.register(r'genres', GenreViewSet)

urlpatterns = router.urls
