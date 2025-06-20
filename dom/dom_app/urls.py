from django.urls import path
from . import views

urlpatterns = [
    #post views
    path('posts/', views.PostListCreate.as_view(), name='post-list'), #all posts
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name = 'post_detail'), #post detail
    path('posts/del/<int:pk>/', views.PostDelete.as_view(), name='post-delete'), #delete post
    path('posts/<int:pk>/like/', views.LikeToggleView.as_view(), name="post_like"), #like and unlike
    path('posts/<int:post_id>/comments/', views.CommentListCreateView.as_view(), name="post_comments"),#comment
        #follow views
   
    
  
    
    
    
   
    
    

]