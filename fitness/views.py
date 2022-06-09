# rest_framework imports
from psycopg2 import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status # status has a list of status codes we can use in our Response
from rest_framework.exceptions import NotFound # not found is going to provide us with an exception that sends a 404 response to the end user

# custom imports
from .models import Fitness # model will be used to query the db
from .serializers.common import FitnessSerializer
from .serializers.populated import PopulatedFitnessSerializer
class FitnessListView(APIView):

  # ENDPOINTS & METHODS
  # GET /fitness/
  # POST /fitness/
  
  #? GET - Returns all fitness things
  def get(self, request):
    # in this controller, we just want to get all the items inside the fitness table and return it as a response
    fitness = Fitness.objects.all() # gets all the fields using the all() method
    # .all() returns a QuerySet, we need to use the serializer to convert this into a python datatype
    serialized_fitness = PopulatedFitnessSerializer(fitness, many=True) # if we expect multiple items in the QuerySet, use many=True
    print('Serialized Data ->', serialized_fitness)
    print('fitness -> ', fitness)
    return Response(serialized_fitness.data, status=status.HTTP_200_OK) # Response() sends data and status back to the user as a response

  #? POST - Add a new fitness thing to the database
  def post(self, request):
    # to get the request body, we use the data key on the request object
    # this process of passing python into a serializer to convert to a QuerySet is known as deserialization
    deserialized_fitness = FitnessSerializer(data=request.data)
    # serializers give us methods to check validity of the data being passed into the database
    # what this does is checks the model and makes sure it passes that validation
    # the method is is_valid() -> this raises an exception if it's not valid
    try:
      deserialized_fitness.is_valid()
      # if we get to this point then validation is passed
      # if is_valid() fails then we throw an exception
      deserialized_fitness.save()
      # if we get to this point the record has been saved
      # when saving, a data key is added to the Fitness instance that contains a python copy of the record that has just been created
      return Response(deserialized_fitness.data, status.HTTP_201_CREATED)
    except Exception as e:
      print(type(e))
      print(e)
      return Response({'detail':str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)



class FitnessDetailView(APIView):

  # Custom function
  # purpose of this function is to attempt to find a specific fitness item, thus returning the fitness item and throwing a 404 if it fails.
  def get_fitness(self, pk):
    try:
      # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
      # the second pk is the captured value
      # this is the same as saying in SQL: WHERE id =1
      return Fitness.objects.get(pk=pk)
    except Fitness.DoesNotExist as e:
      print(e)
      raise NotFound({'detail':str(e)})

  # GET - return one item from the fitness table
  def get(self, _request, pk):
    fitness_item = self.get_fitness(pk)
    print('fitness item ->', fitness_item)
    serialized_fitness_item = PopulatedFitnessSerializer(fitness_item)
    return Response(serialized_fitness_item.data, status.HTTP_200_OK)
