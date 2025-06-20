from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, Post, Comment
from .serializers import UserSerializer, ProfileSerializer, PostSerializer, CommentSerializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action



#comment view
class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializers
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post__id = post_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        profile = self.request.user.profile
        serializer.save(profile=profile, post_id = post_id)
        
#Like and unlike view
class LikeToggleView(generics.GenericAPIView):
    permission_classes = {IsAuthenticated}
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-created_at')
    

    def post(self, request, pk):
        profile = Profile.objects.get(user = self.request.user)
        post = Post.objects.get(pk=pk)
        
        if profile in post.likes.all():
            post.likes.remove(profile)
            liked = False
        else:
            post.likes.add(profile)
            liked = True
        return Response({
            'liked': liked,
            'total_likes': post.total_likes(),
        }, status=status.HTTP_200_OK)
        

        

    
#post detail view
class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

            
#profile-specific post
class UserPostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user = user).order_by('-created_at')
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
    
#create and view posts
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        user = self.request.user
        profile = user.profile
        followed_profiles = profile.follows.all()
        return Post.objects.filter( user__profile__in=list(followed_profiles) + [profile]
).order_by('-created_at')
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
     
#delete post   
class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)


    
