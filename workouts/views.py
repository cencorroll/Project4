from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status # status has a list of status codes we can use in our Response
from rest_framework.exceptions import NotFound # not found is going to provide us with an exception that sends a 404 response to the end user


from .serializers.populated import PopulatedWorkoutSerializer
from .serializers.common import WorkoutSerializer
from .models import Workout

# import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class WorkoutListView(APIView):

  def get(self, _request):
    workouts = Workout.objects.all()
    serialized_workouts = PopulatedWorkoutSerializer(workouts, many=True)
    return Response(serialized_workouts.data)

class WorkoutDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  # Custom function
  # purpose of this function is to attempt to find a specific workout, thus returning the workout and throwing a 404 if it fails.
  def get_workout(self, pk):
    try:
      # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
      # the second pk is the captured value
      # this is the same as saying in SQL: WHERE id =1
      return Workout.objects.get(pk=pk)
    except Workout.DoesNotExist as e:
      print(e)
      raise NotFound({'detail':str(e)})

  # GET - return one item from the Workouts table
  def get(self, request, pk):
    workout = self.get_workout(pk)
    print('workout ->', workout)
    serialized_workout = PopulatedWorkoutSerializer(workout)
    return Response(serialized_workout.data, status.HTTP_200_OK)