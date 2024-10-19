from rest_framework import viewsets, parsers, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import transaction
from .models import Video
from .serializers import VideoSerializer
import logging

logger = logging.getLogger(__name__)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.select_related('author').all()
    serializer_class = VideoSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return super().get_queryset().order_by('-created_at')

    def create(self, request, *args, **kwargs):
        user = request.user
        file = request.FILES.get('file')
        title = request.data.get('title')
        description = request.data.get('description')
        print(f'title: {title}, description: {description}')
        
        if not file:
            raise ValidationError({"file": "No file provided"})

        try:
            with transaction.atomic():
                video = Video.objects.create(
                    author=user,
                    file=file,
                    title=title,
                    description=description
                )
                serializer = self.get_serializer(video)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error creating video: {e}")
            return Response(
                {"detail": "Failed to upload video"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
