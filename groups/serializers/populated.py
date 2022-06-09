from .common import GroupSerializer
from fitness.serializers.common import FitnessSerializer

class PopulatedGroupSerializer(GroupSerializer):
  fitness = FitnessSerializer(many=True)