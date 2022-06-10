# this populated serializer is goint to inherit the Exercises serializer
# by inheriting this class, we will also inherit the class it inherited
# so we don't have to import rest framework serializers and inherit that, because our ExercisesSerializer has already inherited it
# this means we don't have to redefine our Meta class, we just need to define our new field, in our case reviews

from .common import ExercisesSerializer # import ExercisesSerializer to inherit
from groups.serializers.populated import PopulatedGroupSerializer

from groups.serializers.common import GroupSerializer

# defining our populated serializer
class PopulatedExercisesSerializer(ExercisesSerializer):
  # one task in this class is to define our field to populate
  groups = PopulatedGroupSerializer(many=True)