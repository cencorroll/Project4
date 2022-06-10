from .common import WorkoutSerializer
from fitness.serializers.populated import PopulatedFitnessSerializer
from groups.serializers.populated import PopulatedGroupSerializer

class PopulatedWorkoutSerializer(WorkoutSerializer):
  groups = PopulatedGroupSerializer(many=True)
  fitness = PopulatedFitnessSerializer(many=True)