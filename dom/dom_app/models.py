from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from profile_app.models import Profile
#comments 
class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
    profile = models.ForeignKey('profile_app.Profile', on_delete= models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    #replies
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies' )
    
    def __str__(self):
        return f"{self.profile.username} on {self.post.user.username}: {self.content[:20]}..."
    
#seperate comment like model too keep track who likes it
class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="like_comment")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['comment', 'profile']


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='posts')
    body = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    #like posts
    likes = models.ManyToManyField(Profile, related_name= 'liked_posts', blank=True)
    
    def __str__(self):
        return (
            f"{self.user} "
            f"({self.created_at:%Y-%m-%d %H:%M}): "
            f"{self.body}..."
        )
        
    def total_likes(self):
        return self.likes.count()

