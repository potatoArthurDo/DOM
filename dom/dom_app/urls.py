from django.urls import path
from . import views

urlpatterns = [
    #post views
    
    #post actions
    path('posts/', views.PostListCreate.as_view(), name='post-list'), #all posts
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name = 'post_detail'), #post detail
    path('posts/del/<int:pk>/', views.PostDelete.as_view(), name='post-delete'), #delete post
    
    #post like
    path('posts/<int:pk>/like/', views.LikeToggleView.as_view(), name="post_like"), #like and unlike
    
    #post comments
    path('posts/<int:post_id>/comments/', views.CommentListCreateView.as_view(), name="post_comments"),#comment
    path('posts/comments/<int:comment_id>/like/', views.CommentLikeToggleView.as_view(), name='toggle_comment_like'),
    
    #post search
    path('posts/search/', views.SearchPostView.as_view(), name = 'search_post'),
    
   
    
  
    
    
    
   
    
    

]