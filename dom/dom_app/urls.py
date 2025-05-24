from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreate.as_view(), name='post-list'),
    path('posts/del/<int:pk>/', views.PostDelete.as_view(), name='post-delete'),
    path('profile/', views.UserPostList.as_view(), name='profile-view'),
    path('current_user/', views.GetCurrentUser.as_view(), name="current_user"),
    path('profiles/', views.ProfileListView.as_view(), name="profile_list"),
    path('search-users/', views.SearchUserView.as_view(), name="search-user"),
    path('follows/', views.FollowListView.as_view(), name="follows")

]