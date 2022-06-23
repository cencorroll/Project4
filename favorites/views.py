from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status # status has a list of status codes we can use in our Response
from rest_framework.exceptions import NotFound # not found is going to provide us with an exception that sends a 404 response to the end user


from .serializers.populated import PopulatedFavoriteExerciseSerializer
from .serializers.populated import PopulatedFavoriteWorkoutSerializer
from .serializers.common import FavoriteExerciseSerializer
from .serializers.common import FavoriteWorkoutSerializer

from .models import FavoriteExercise
from .models import FavoriteWorkout

# import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class FavoriteWorkoutListView(APIView):

  def get(self, request):
    workouts = FavoriteWorkout.objects.all()
    serialized_favorite_workouts = PopulatedFavoriteWorkoutSerializer(workouts, many=True)
    return Response(serialized_favorite_workouts.data)

class FavoriteWorkoutDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  # Custom function
  # purpose of this function is to attempt to find a specific workout, thus returning the workout and throwing a 404 if it fails.
  def get_favorite_workout(self, pk):
    try:
      # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
      # the second pk is the captured value
      # this is the same as saying in SQL: WHERE id =1
      return FavoriteWorkout.objects.get(pk=pk)
    except FavoriteWorkout.DoesNotExist as e:
      print(e)
      raise NotFound({'detail':str(e)})

  # GET - return one item from the Workouts table
  def get(self, request, pk):
    workout = self.get_favorite_workout(pk)
    print('workout ->', workout)
    serialized_workout = PopulatedFavoriteWorkoutSerializer(workout)
    return Response(serialized_workout.data, status.HTTP_200_OK)

    # DELETE - delete a favorite workout
  def delete(self, request, pk, format=None):
        favorite_workout_to_delete = self.get_favorite_workout(pk)
        favorite_workout_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FavoriteExercisesListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, ) # one-tuple requires trailing comma

  # ENDPOINTS & METHODS
  # GET /exercises/
  # POST /exercises/
  
  #? GET - Returns all exercises
  def get(self, request):
    # in this controller, we just want to get all the items inside the exercises table and return it as a response
    exercises = FavoriteExercise.objects.all() # gets all the fields using the all() method
    # .all() returns a QuerySet, we need to use the serializer to convert this into a python datatype
    serialized_exercises = PopulatedFavoriteExerciseSerializer(exercises, many=True) # if we expect multiple items in the QuerySet, use many=True
    print('Serialized Data ->', serialized_exercises)
    return Response(serialized_exercises.data, status=status.HTTP_200_OK) # Response() sends data and status back to the user as a response


# FAVORITE EXERCISES
class FavoriteExercisesDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  # Custom function
  # purpose of this function is to attempt to find a specific exercise, thus returning the exercise and throwing a 404 if it fails.
  def get_favorite_exercise(self, pk):
    try:
      # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
      # the second pk is the captured value
      # this is the same as saying in SQL: WHERE id =1
      return FavoriteExercise.objects.get(pk=pk)
    except FavoriteExercise.DoesNotExist as e:
      print(e)
      raise NotFound({'detail':str(e)})

  # GET - return one item from the Exercises table
  def get(self, request, pk):
    exercise = self.get_favorite_exercise(pk)
    print('exercise ->', exercise)
    serialized_favorite_exercise = PopulatedFavoriteExerciseSerializer(exercise)
    return Response(serialized_favorite_exercise.data, status.HTTP_200_OK)

  # DELETE - delete a favorited exercise
  def delete(self, request, pk, format=None):
        favorite_exercise_to_delete = self.get_favorite_exercise(pk)
        favorite_exercise_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
