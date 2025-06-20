from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    # email = models.EmailField(max_length=200)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')
    follows = models.ManyToManyField("self", 
        related_name='followed_by',
        
        #If Profile A follows Profile B, it doesn’t imply Profile B follows Profile A.
        symmetrical=False,
        blank=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.username
    
#Create a profile when a new user is created
def create_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile(user = instance)
        profile.save()
        #have the User follow themselves
        profile.follows.set([instance.profile.id])
post_save.connect(create_profile, sender=User)