
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from dom_app.views import CreateUserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dom_app/user/register', CreateUserView.as_view(), name='user-register'),
    path("dom_app/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("dom_app/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("dom_app-auth/", include("rest_framework.urls")),
    
    path('', include('dom_app.urls')),
    
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT )
