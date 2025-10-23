from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login as django_login
from rest_framework.authtoken.models import Token
from .serializers import UserRegistrationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "success": True,
                "username": user.username,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginAPIView(APIView):
    def post(self, request):
            username = request.data.get('username')
            password = request.data.get('password')
            user = authenticate(username=username, password=password)
            if user:
                #token, _ = Token.objects.get_or_create(user=user)
                #return Response({"token": token.key})
                django_login(request, user)
                return Response({"success": True})
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)