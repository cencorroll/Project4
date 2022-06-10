from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import ExercisesListView, ExercisesDetailView

# any request getting through to this point is prefixed with the /Exercises/ endpoint
# example: http://localhost:8000/albums/
# id example: http://localhost:8000/albums/:pk/ pk is primary key, could be id but pk is best practise

urlpatterns = [
  path('', ExercisesListView.as_view()), # as_view passes the http request onto the request attribute on the view/controller
  path('<int:pk>/', ExercisesDetailView.as_view() )
  # '<int:pk>' - this is known as a captured value
  # on the left is our path converter. Here we've specified a type of integer
  # this isnt needed and we could write just <pk>, but we're being more specific about the type we're expecting
]