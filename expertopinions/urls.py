from django.urls import path
from .views import ExpertOpinionListView

# default for this conf file is: /genres/

urlpatterns = [
    path('', ExpertOpinionListView.as_view())
]