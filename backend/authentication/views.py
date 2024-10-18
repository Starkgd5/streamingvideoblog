from rest_framework import permissions, generics, response, status
from authentication.serializers import RegisterSerializer, UserSerializer, \
                          MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from authentication.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user:
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return response.Response({'message': 'Logout successful'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
