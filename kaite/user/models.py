from django.db import models
from django.contrib.auth.models import AbstractUser
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["ml_db"]

class UserProfile(AbstractUser):
    bio = models.TextField(blank=True,default="Loving Kaite!")
    profile_image = models.ImageField(
        upload_to="profile_images/",
        blank=True,
        null=True,
        default="profile_images/default.png")
    friends = models.ManyToManyField("self", blank=True)
    
    def save(self, *args, **kwargs):
        created = self._state.adding
        super().save(*args, **kwargs)

        if created:
            db.user_data.insert_one({
                "user_id": self.id,
                "username": self.username,
                "datasets": [],
                "models": [],
            })

    def __str__(self):
        return self.username

class FriendRequest(models.Model):
    sender = models.ForeignKey(UserProfile, related_name='sent_requests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(UserProfile, related_name='received_requests', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f"{self.sender} → {self.receiver} ({'Accepted' if self.accepted else 'Pending'})"
