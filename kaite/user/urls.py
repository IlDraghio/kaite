from django.urls import path
from .views import *
from .api_views import *
urlpatterns = [
    path('login/', login_view, name='login'),
    path('registration/', registration_view, name='registration'),
    path('users/<str:username>/', profile_view, name='profile'),
    path('api/register/', UserRegistrationAPIView.as_view(), name='api-registration'),
    path('api/login/', UserLoginAPIView.as_view(), name='api-login'),
    path('api/logout/', UserLogoutAPIView.as_view(), name='api-logout'),
    path('api/friends-list/', FriendsListAPIView.as_view(), name='api-friends-list'),
    path('api/search-users/', UserSearchAPIView.as_view(), name='user-search'),
]