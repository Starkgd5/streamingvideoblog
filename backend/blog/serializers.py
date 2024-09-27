from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'file', 'thumbnail_url', 'created_at', 'author']
        read_only_fields = ['id', 'created_at', 'author']

    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            return self.context['request'].build_absolute_uri(obj.thumbnail.url)
        return None