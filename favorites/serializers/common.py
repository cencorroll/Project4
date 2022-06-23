from rest_framework import serializers
from ..models import FavoriteExercise
from ..models import FavoriteWorkout

class FavoriteExerciseSerializer(serializers.ModelSerializer):
  class Meta:
    model = FavoriteExercise
    fields = '__all__' 

class FavoriteWorkoutSerializer(serializers.ModelSerializer):
  class Meta:
    model = FavoriteWorkout
    fields = '__all__' 