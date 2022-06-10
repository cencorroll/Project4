from django.urls import path
from .views import WorkoutListView

urlpatterns = [
  path('', WorkoutListView.as_view())
]