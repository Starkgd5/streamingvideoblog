from io import BytesIO

from django.http import HttpResponse
from PIL import Image, ImageDraw
from rest_framework import viewsets

from .models import Video
from .serializers import VideoSerializer


def placeholder_image(request, width, height):
    # Cria uma nova imagem com fundo cinza
    size = (int(width), int(height))
    image = Image.new('RGB', size, color='#CCCCCC')

    # Cria um objeto para desenhar na imagem
    draw = ImageDraw.Draw(image)

    # Adiciona texto com as dimensões
    text = f'{width}x{height}'
    textwidth, textheight = draw.textsize(text)
    x = (size[0] - textwidth) / 2
    y = (size[1] - textheight) / 2
    draw.text((x, y), text, fill='#000000')

    # Salva a imagem em um buffer
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    buffer.seek(0)

    # Retorna a imagem como resposta HTTP
    return HttpResponse(buffer, content_type='image/png')


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
