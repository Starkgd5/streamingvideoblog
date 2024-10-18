from rest_framework import serializers
from .models import Video
from authentication.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField(
        required=True,
        allow_empty_file=False,
    )


class VideoSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    author = AuthorSerializer(read_only=True)
    thumbnail = serializers.ImageField(required=False)
    file = serializers.FileField(required=True)

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'file', 'thumbnail', 'thumbnail_url', 'created_at', 'author']
        read_only_fields = ['id', 'created_at', 'thumbnail_url']

    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            return self.context['request'].build_absolute_uri(obj.thumbnail.url)
        return None
    