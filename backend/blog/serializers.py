from rest_framework import serializers
from .models import Video
from authentication.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class VideoSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    thumbnail = serializers.ImageField(required=False)
    file = serializers.FileField(required=True)

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'file', 'thumbnail', 'created_at', 'author']
        read_only_fields = ['id', 'created_at']
    