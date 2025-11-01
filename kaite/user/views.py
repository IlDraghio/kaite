from django.shortcuts import render
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model

User = get_user_model()

def login_view(request):
    return render(request,'user/login.html')

def registration_view(request):
    return render(request,'user/registration.html')

def profile_view(request,username):
    user = get_object_or_404(User, username=username)
    return render(request, 'user/profile.html', {'user': user})