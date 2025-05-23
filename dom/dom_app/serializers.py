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
    class Meta:
        model = Profile
        fields = ['id','user','username', 'name','avatar', 'follows', 'modified_at']
        extra_kwargs = {'user': {'read_only': True}}

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile = ProfileSerializer(source='user.profile', read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'user', 'body','profile','created_at']
        extra_kwargs = {'user': {'read_only': True}}