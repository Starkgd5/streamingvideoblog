from rest_framework import viewsets, parsers, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import transaction
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import Video
from .serializers import VideoSerializer
from authentication.models import User
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
        user_id = request.user.id
        user = User.objects.get(id=user_id)
        file = request.FILES.getlist('file')
        video_obj = self.queryset.create(
            author=user,
            file=file
        )
        return Response(
            video_obj, status=status.HTTP_201_CREATED)
