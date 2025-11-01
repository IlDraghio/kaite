from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from rest_framework.permissions import IsAuthenticated
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
        
class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        django_logout(request)
        return Response({"success": True})
    
class FriendsListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        friends = request.user.friends.all()
        data = [
                {
                "username": f.username,
                "profile_image": f.profile_image.url
                }
                for f in friends
                ]
        return Response(data)
    
class UserSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get("q", "")
        if not query:
            return Response({"results": []})

        users = User.objects.filter(username__icontains=query)[:5]
        data = [
            {
                "username": u.username,
                "profile_image": u.profile_image.url if u.profile_image else None,
                "profile_url": f"/profile/{u.username}/"
            }
            for u in users
        ]
        return Response({"results": data})