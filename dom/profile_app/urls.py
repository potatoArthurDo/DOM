from django.urls import path
from . import views

urlpatterns = [
      #profile views
    path('profile/<int:pk>/', views.UserProfileDetailView.as_view(), name = "user_profile"),
    path('profile/<int:pk>/posts/', views.ProfilePostView.as_view(), name ="profile_post"),
    path('profile/', views.UserPostList.as_view(), name='profile-view'), #?? 
    path('profiles/', views.ProfileListView.as_view(), name="profile_list"), #what did i do here ?
    
    path('current_user/', views.GetCurrentUser.as_view(), name="current_user"), #get current user
    path('search-users/', views.SearchUserView.as_view(), name="search-user"),
    
     path('follows/', views.FollowListView.as_view(), name="follows"),
    path('profile/<int:pk>/follow/', views.FollowToggleView.as_view(), name="follow_user"), #follow and unfollow user
]