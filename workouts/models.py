from django.db import models

# Create your models here.

class Workout(models.Model):
  name = models.CharField(max_length=100, default=None)
  groups = models.ForeignKey(
    'groups.Group', # model that this field is related to
    related_name='workouts',
    on_delete=models.CASCADE
  )
  exercises = models.ForeignKey(
    'exercises.Exercise', # model that this field is related to
    related_name='workouts',
    on_delete=models.CASCADE
  )
