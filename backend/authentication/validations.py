from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    password = data['password'].strip()
    username = data['username'].strip()

    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Email já cadastrado')
    if not password or len(password) < 8:
        raise ValidationError('Senha deve conter pelo menos 8 caracteres')
    if not username or UserModel.objects.filter(username=username).exists():
        raise ValidationError('Nome de usuário já cadastrado')
    return data
