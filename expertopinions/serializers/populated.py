from .common import ExpertOpinionSerializer
from fitness.serializers.common import FitnessSerializer

class PopulatedExpertOpinionSerializer(ExpertOpinionSerializer):
  fitness = FitnessSerializer(many=True)