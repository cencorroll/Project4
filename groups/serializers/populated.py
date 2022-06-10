from .common import GroupSerializer
from exercises.serializers.common import ExercisesSerializer

class PopulatedGroupSerializer(GroupSerializer):
  exercises = ExercisesSerializer(many=True)