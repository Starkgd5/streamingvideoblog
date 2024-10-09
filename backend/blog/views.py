from rest_framework import parsers, viewsets

from .models import Video
from .serializers import VideoSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        file = self.request.FILES.get('file')
        if file:
            pass
        title = self.request.data.get('title')
        if title:
            pass
        description = self.request.data.get('description')
        if description:
            pass
        serializer.save(
            author=self.request.user,
            file=file,
            title=title,
            description=description
        )
