from django.contrib import admin
from .models import FavoriteExercise, FavoriteWorkout

# Register your models here.
admin.site.register(FavoriteWorkout)
admin.site.register(FavoriteExercise)
