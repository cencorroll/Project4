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
  
    #? POST - Add own workout to the database
  def post(self, request):
    # to get the request body, we use the data key on the request object
    # this process of passing python into a serializer to convert to a QuerySet is known as deserialization
    deserialized_workout = WorkoutSerializer(data=request.data)
    # serializers give us methods to check validity of the data being passed into the database
    # what this does is checks the model and makes sure it passes that validation
    # the method is is_valid() -> this raises an exception if it's not valid
    try:
      deserialized_workout.is_valid()
      print(deserialized_workout.errors)
      # if we get to this point then validation is passed
      # if is_valid() fails then we throw an exception
      deserialized_workout.save()
      # if we get to this point the record has been saved
      # when saving, a data key is added to the workouts instance that contains a python copy of the record that has just been created
      return Response(deserialized_workout.data, status.HTTP_201_CREATED)
    except Exception as e:
      print(type(e))
      print(e)
      return Response({'detail':str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)

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