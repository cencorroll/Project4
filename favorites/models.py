from django.db import models

# Create your models here.

class FavoriteExercise(models.Model):
  name = models.CharField(max_length=100, default=None)
  exercises = models.ManyToManyField(
    'exercises.Exercise', # model that this field is related to
    related_name='favorites'
  )

class FavoriteWorkout(models.Model):
  name = models.CharField(max_length=100, default=None)
  workouts = models.ManyToManyField(
    'workouts.Workout', # model that this field is related to
    related_name='favorites'
  )

  def __str__(self):
    return f'{self.name}'