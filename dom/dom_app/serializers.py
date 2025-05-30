from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['id','user','username', 'name','avatar', 'follows','is_following', 'modified_at']
        extra_kwargs = {'user': {'read_only': True}}
        
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user_profile = Profile.objects.get(user=request.user)
            return obj in user_profile.follows.all()
        return False
        
class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile = ProfileSerializer(source='user.profile', read_only=True)
    
    total_likes = serializers.IntegerField(read_only = True)
    liked_by_user = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'user', 'body','image','profile','created_at', 'total_likes', "liked_by_user"]
        extra_kwargs = {'user': {'read_only': True}}
    
    def get_liked_by_user(self,obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        profile  = Profile.objects.get(user=user)
        return profile in obj.likes.all()