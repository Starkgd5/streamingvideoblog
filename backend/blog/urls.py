from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import VideoViewSet, placeholder_image

router = DefaultRouter()
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('placeholder/<int:width>/<int:height>/',
         placeholder_image, name='placeholder')
]
