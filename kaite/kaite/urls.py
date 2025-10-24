from django.contrib import admin
from django.urls import re_path, path, include
from django.http import HttpResponseNotFound
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls')),
    path('', include('user.urls')),
]

urlpatterns += [
    re_path(r'^\.well-known/.*$', lambda request: HttpResponseNotFound()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)