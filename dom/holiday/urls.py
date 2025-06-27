from django.urls import path
from .views import holiday_list, holiday_view

urlpatterns = [
    path("", holiday_list, name="holiday_list"),
    path("today/", holiday_view, name="holiday_today")
]