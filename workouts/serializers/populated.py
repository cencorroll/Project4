from .common import WorkoutSerializer
from exercises.serializers.common import ExercisesSerializer
from groups.serializers.common import GroupSerializer

class PopulatedWorkoutSerializer(WorkoutSerializer):
  exercises = ExercisesSerializer(many=True)