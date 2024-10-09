from rest_framework import status, response, permissions, generics
from .serializers import (RegisterSerializer, UserSerializer,
                          MyTokenObtainPairSerializer)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from authentication.models import User


class UserRegisterView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# class LogoutView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         # Remove the refresh token from the request data
#         request.data.pop('refresh', None)

#         # Revoke the access token
#         self.revoke_token(request.data.get('token'))

#         return response.Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

#     def revoke_token(self, token):
#         # Implement logic to revoke the token based on your token storage mechanism
#         # For example, if using the default JWT token storage in Django REST framework, you can use the following:
#         BlacklistToken.objects.create(token=token)