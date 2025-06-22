from django.contrib.auth.models import User
from rest_framework import serializers
from .models import  Post, Comment
from profile_app.models import Profile
from profile_app.serializers import UserSerializer, ProfileSerializer
        
class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile = ProfileSerializer(source='user.profile', read_only=True)
    
    total_likes = serializers.IntegerField(read_only = True)
    liked_by_user = serializers.SerializerMethodField()
    
    total_comments = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'user', 'body','image','profile','created_at', 'total_likes', 'total_comments', "liked_by_user"]
        extra_kwargs = {'user': {'read_only': True}}
    
    def get_liked_by_user(self,obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        profile  = Profile.objects.get(user=user)
        return profile in obj.likes.all()
    
    def get_total_comments(self, obj):
        return obj.comments.count()

class CommentSerializers(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.username', read_only=True)
    avatar = serializers.ImageField(source='profile.avatar', read_only=True)
    profile_id = serializers.CharField(source = 'profile.id', read_only = True)
    
    class Meta:
        model = Comment
        fields = ['id', 'profile_id','post', 'profile','username', 'avatar', 'content', 'created_at']
        #so they won't expect these from client
        read_only_fields = ['id', 'post', 'profile', 'created_at']