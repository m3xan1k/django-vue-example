from django.db import models


class Task(models.Model):
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ['completed', '-date']
