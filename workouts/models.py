from django.db import models

# Create your models here.

class Workout(models.Model):
  name = models.CharField(max_length=100, default=None)
  exercises = models.ManyToManyField(
    'exercises.Exercise', # model that this field is related to
    related_name='workouts'
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='reviews',
    on_delete=models.CASCADE
  )

  def __str__(self):
    return f'{self.name}'