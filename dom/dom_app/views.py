from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, Post
from .serializers import UserSerializer, ProfileSerializer, PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class FollowToggleView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    
    def post(self, request, pk):
        target_profile = Profile.objects.get(pk=pk)
        user_profile = self.request.user.profile
        
        if target_profile in user_profile.follows.all():
            user_profile.follows.remove(target_profile)
            return Response({'message': 'Unfollowed'})
        else:
            user_profile.follows.add(target_profile)
            return Response({'message': 'Followed'})
        
#people user follow
class FollowListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.get(user = user).follows.all()
    
#search for users
class SearchUserView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.request.GET.get('q', '')
        return Profile.objects.filter(username__icontains=query)
        
#get user's profile 
class UserProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            profile = Profile.objects.get(pk=pk)
            serializer = self.get_serializer(profile, context={'request': request})
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
#get user's post 
class ProfilePostView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        profile = Profile.objects.get(pk=pk)
        return Post.objects.filter(user = profile.user).order_by('-created_at')
    
#get users list
class ProfileListView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    
#profile-specific post
class UserPostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
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

#get logged in user
class GetCurrentUser(generics.GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
    
#create user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]