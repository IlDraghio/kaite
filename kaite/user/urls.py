from django.urls import path
from .views import login_view,registration_view
from .api_views import UserRegistrationAPIView,UserLoginAPIView

urlpatterns = [
    path('login/', login_view, name='login'),
    path('registration/', registration_view, name='registration'),
    path('api/register/', UserRegistrationAPIView.as_view(), name='api-registration'),
    path('api/login/', UserLoginAPIView.as_view(), name='api-login'),
]