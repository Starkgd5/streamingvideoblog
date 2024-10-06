from rest_framework import parsers, viewsets

from .models import Video
from .serializers import VideoSerializer

# from rest_framework.permissions import IsAuthenticatedOrReadOnly

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author_id=1)