from .common import WorkoutSerializer
from exercises.serializers.populated import PopulatedExercisesSerializer
from groups.serializers.populated import PopulatedGroupSerializer

class PopulatedWorkoutSerializer(WorkoutSerializer):
  groups = PopulatedGroupSerializer(many=True)
  exercises = PopulatedExercisesSerializer(many=True)