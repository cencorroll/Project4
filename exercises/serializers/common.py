from rest_framework import serializers # serializers hold our ModelSerializer class
from ..models import Exercise # importing exercises but because we're in a different folder we have to go up twice by using ..

class ExercisesSerializer(serializers.ModelSerializer):
  # define a Meta subclass that details which model and fields to serialize
  class Meta:
    model = Exercise # define model to serialize from
    fields = '__all__' # fields can be a tuple of field names or __all__ to get all fields