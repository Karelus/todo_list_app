from django.db import models

# Create your models here.
class Todo(models.Model):
    content = models.CharField(max_length=100, default="")
    completed = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content