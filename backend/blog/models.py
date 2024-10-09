from django.db import models
from django.core.files import File
from moviepy.editor import VideoFileClip
from PIL import Image
import os
import tempfile
from authentication.models import User

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.thumbnail:
            self.create_thumbnail()

    def create_thumbnail(self):
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as temp_file:
            video_path = self.file.path
            clip = VideoFileClip(video_path)
            clip.save_frame(temp_file.name, t=1.0)  # Save frame at 1 second

            # Open the saved image and create a thumbnail
            image = Image.open(temp_file.name)
            image.thumbnail((320, 180))  # Removido Image.ANTIALIAS
            
            # Save the thumbnail
            thumb_name = f'thumb_{os.path.basename(self.file.name)}'  # Usando os.path.basename para melhorar a legibilidade
            thumb_path = os.path.join('media/thumbnails', thumb_name)
            image.save(thumb_path, 'JPEG')

            # Save the thumbnail path to the model field
            with open(thumb_path, 'rb') as thumb_file:
                self.thumbnail.save(thumb_name, File(thumb_file), save=True)

            # Clean up the temporary files
            os.unlink(temp_file.name)
            # Não é necessário deletar thumb_path aqui, pois estamos salvando no modelo.
