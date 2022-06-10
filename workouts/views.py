from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers.populated import PopulatedWorkoutSerializer
from .models import Workout

class WorkoutListView(APIView):

  def get(self, _request):
    workouts = Workout.objects.all()
    serialized_workouts = PopulatedWorkoutSerializer(workouts, many=True)
    return Response(serialized_workouts.data)