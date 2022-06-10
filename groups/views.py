from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers.populated import PopulatedGroupSerializer
from .models import Group

class GroupListView(APIView):

  def get(self, _request):
    groups = Group.objects.all()
    serialized_groups = PopulatedGroupSerializer(groups, many=True)
    return Response(serialized_groups.data)