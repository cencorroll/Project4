from rest_framework import serializers
from ..models import ExpertOpinion

class ExpertOpinionSerializer(serializers.ModelSerializer):
  class Meta: 
    model = ExpertOpinion
    fields = '__all__'