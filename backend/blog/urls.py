from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import VideoViewSet

router = DefaultRouter()
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
