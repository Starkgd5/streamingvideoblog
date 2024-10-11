from rest_framework import permissions, generics
from authentication.serializers import RegisterSerializer, UserSerializer, \
                          MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from authentication.models import User


class UserRegisterView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    # def post(self, request):
    #     # Remove the refresh token from the request data
    #     request.data.pop('refresh', None)

    #     # Revoke the access token
    #     self.revoke_token(request.data.get('token'))

    #     return response.Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

    # def revoke_token(self, token):
    #     # Implement logic to revoke the token based on your token storage mechanism
    #     # For example, if using the default JWT token storage in Django REST framework, you can use the following:
    #     BlacklistToken.objects.create(token=token)