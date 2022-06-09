from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers.populated import PopulatedExpertOpinionSerializer
from .models import ExpertOpinion

class ExpertOpinionListView(APIView):

  def get(self, _request):
    expertopinions = ExpertOpinion.objects.all()
    serialized_expertopinions = PopulatedExpertOpinionSerializer(expertopinions, many=True)
    return Response(serialized_expertopinions.data)