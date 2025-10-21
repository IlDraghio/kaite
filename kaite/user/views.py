from django.shortcuts import render

def login_view(request):
    return render(request,'user/login.html')

def registration_view(request):
    return render(request,'user/registration.html')