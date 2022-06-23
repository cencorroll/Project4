from django.urls import path
from .views import FavoriteWorkoutListView, FavoriteWorkoutDetailView, FavoriteExercisesDetailView, FavoriteExercisesListView

urlpatterns = [
  path('', FavoriteWorkoutListView.as_view()),
  path('<int:pk>/', FavoriteWorkoutDetailView.as_view() ),
  path('', FavoriteExercisesListView.as_view()),
  path('<int:pk>/', FavoriteExercisesDetailView.as_view() )
]