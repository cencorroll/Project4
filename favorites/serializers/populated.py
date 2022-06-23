from .common import FavoriteExerciseSerializer
from .common import FavoriteWorkoutSerializer
from exercises.serializers.common import ExercisesSerializer
from groups.serializers.common import GroupSerializer

class PopulatedFavoriteExerciseSerializer(FavoriteExerciseSerializer):
  groups = GroupSerializer(many=True)
  exercises = ExercisesSerializer(many=True)

class PopulatedFavoriteWorkoutSerializer(FavoriteWorkoutSerializer):
  groups = GroupSerializer(many=True)
  exercises = ExercisesSerializer(many=True)